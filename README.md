# foodprint-calculator

### Setup

```
npm install
npm run dev
```

### Deploy

```
# Find running forever process
forever list

# Kill it
forever stop {pid}

# Find running system process
ps aux

# Kill that as well
kill -9 {pid}

# After pulling on the droplet, rebuild the app
npm run build

# Start new server
forever start -c "npm run start" ./
```
