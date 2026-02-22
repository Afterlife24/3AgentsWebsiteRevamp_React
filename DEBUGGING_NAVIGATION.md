# Debugging Navigation Issues

## Quick Checklist

### 1. Check Frontend Console (Browser DevTools)

Open your website and the browser console (F12), then look for:

**When widget loads:**
```
[NavigationHandler] Setting up data message listener
[NavigationHandler] Data message listener registered
```

**When you ask agent to navigate:**
```
[NavigationHandler] Received data message: {"type":"navigate",...}
[NavigationHandler] Navigation command received: {...}
[NavigationHandler] Navigating to section: pricing, URL: https://...
```

**If you DON'T see these logs:**
- Frontend code not deployed to S3
- Browser cache issue (hard refresh: Ctrl+Shift+R)
- NavigationHandler not rendering

### 2. Check Backend Logs (EC2)

SSH into EC2 and check logs:

```bash
# If using systemd service
sudo journalctl -u web-agent -f | grep "\[TOOL\]"

# If running manually
tail -f /path/to/agent.log | grep "\[TOOL\]"

# Or check Python process logs
ps aux | grep agent.py
```

**Expected logs when user asks to navigate:**
```
[TOOL] navigate_to_section called with section: pricing
[TOOL] Mapped section 'pricing' to URL: https://www.novaflux.afterlife.org.in/pricing
[TOOL] Room found, sending navigation data to frontend
[TOOL] Successfully sent navigation command for section: pricing
```

**If you see "No room found in context":**
- Agent not properly connected to LiveKit
- Context object doesn't have session.room
- Check agent.py initialization

### 3. Verify Deployment

**Frontend (S3):**
```bash
# Check if latest build is deployed
aws s3 ls s3://your-bucket-name/assets/ --recursive | tail -5

# Check file modification time
aws s3api head-object --bucket your-bucket-name --key index.html
```

**Backend (EC2):**
```bash
# Check if tools.py has latest changes
ssh ubuntu@your-ec2-ip
cd /path/to/WebAgentBackEndRevamp
git log -1 tools.py
git diff HEAD tools.py  # Should show no changes

# Check if agent is running
ps aux | grep agent.py
```

### 4. Test Navigation Flow

**Step-by-step test:**

1. Open website: https://www.novaflux.afterlife.org.in/
2. Open browser console (F12)
3. Click Web Agent widget
4. Wait for connection
5. Check console for: `[NavigationHandler] Data message listener registered`
6. Say: "Open pricing page"
7. Watch console for navigation logs
8. Check if page navigates

### 5. Common Issues & Fixes

#### Issue: No logs in frontend console

**Cause:** Frontend not deployed or cached

**Fix:**
```bash
# Rebuild and redeploy
cd 3AgentsWebsiteRevamp_React
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete

# Clear CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"

# Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

#### Issue: "No room found in context"

**Cause:** Agent not accessing LiveKit room properly

**Fix:** Check agent.py - the context should have session.room

```python
# In agent.py, verify session is started:
await session.start(
    agent=agent,
    room=ctx.room,  # This is important!
    room_input_options=RoomInputOptions(...)
)
```

#### Issue: Frontend receives message but doesn't navigate

**Cause:** JavaScript error in NavigationHandler

**Fix:** Check browser console for errors. Common issues:
- `window.location.href` blocked by browser
- CORS issues
- Invalid URL format

#### Issue: Agent doesn't call the tool

**Cause:** Agent doesn't understand the command or tool not registered

**Fix:**
1. Check if tools are registered in agent.py:
   ```python
   from tools import open_url, navigate_to_section
   
   class Assistant(Agent):
       def __init__(self) -> None:
           super().__init__(
               instructions=AGENT_INSTRUCTION,
               tools=[open_url, navigate_to_section],  # Make sure these are here
           )
   ```

2. Try more explicit commands:
   - "Navigate to pricing page"
   - "Open the pricing page"
   - "Show me pricing"

### 6. Manual Testing

**Test backend directly:**

```python
# SSH into EC2 and run Python shell
python3

from tools import navigate_to_section
from livekit.agents import RunContext

# This will fail but shows if function is importable
print(navigate_to_section.__doc__)
```

**Test frontend directly:**

```javascript
// In browser console, manually trigger navigation
window.location.href = "https://www.novaflux.afterlife.org.in/pricing";
// Should navigate immediately
```

### 7. Verify LiveKit Connection

**Frontend:**
```javascript
// In browser console after connecting
// Check if room is connected
console.log("Room connected:", !!window.livekit_room);
```

**Backend:**
```bash
# Check LiveKit credentials
cat /path/to/WebAgentBackEndRevamp/.env | grep LIVEKIT
```

### 8. Network Tab Check

1. Open browser DevTools → Network tab
2. Filter by "WS" (WebSocket)
3. Look for LiveKit WebSocket connection
4. Should show "101 Switching Protocols"
5. Click on it → Messages tab
6. Look for data messages when you ask agent to navigate

### 9. Quick Fix Commands

**Restart everything:**

```bash
# Backend (EC2)
sudo systemctl restart web-agent

# Frontend (Local)
cd 3AgentsWebsiteRevamp_React
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

**Clear all caches:**

```bash
# Browser: Ctrl+Shift+Delete → Clear cache
# CloudFront: aws cloudfront create-invalidation
# EC2: sudo systemctl restart web-agent
```

### 10. Verify Code Changes

**Check if changes are in production:**

```bash
# Frontend - check built file
cd 3AgentsWebsiteRevamp_React/dist/assets
grep -r "NavigationHandler" .

# Backend - check deployed file
ssh ubuntu@your-ec2-ip
grep -A 5 "publish_data" /path/to/WebAgentBackEndRevamp/tools.py
```

## Still Not Working?

If navigation still doesn't work after all checks:

1. **Share logs with me:**
   - Frontend console logs (screenshot)
   - Backend logs (text)
   - Network tab WebSocket messages

2. **Verify versions:**
   ```bash
   # Frontend
   npm list livekit-client @livekit/components-react
   
   # Backend
   pip list | grep livekit
   ```

3. **Test with simple command:**
   - Say: "Navigate to pricing"
   - Say: "Open pricing page"
   - Say: "Show me the pricing"

4. **Check if agent hears you:**
   - Agent should respond with something like "Let me open that for you"
   - If agent doesn't respond, it's a voice recognition issue, not navigation

## Success Indicators

✅ Frontend console shows: `[NavigationHandler] Data message listener registered`
✅ Backend logs show: `[TOOL] Successfully sent navigation command`
✅ Frontend console shows: `[NavigationHandler] Received data message`
✅ Page navigates to requested URL
