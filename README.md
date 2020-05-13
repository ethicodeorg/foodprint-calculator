# foodprint-calculator

### Setup

```
npm install
npm run dev
```

### Deploy

```
# After pulling on the droplet, rebuild the app
npm run build

# Find running process
forever list

# Stop old server
forever stop {pid}

# Start new server
forever start -c "npm run start" ./
```
