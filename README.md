# foodprint-calculator

### Setup

```
npm install
npm run dev
```

### Deploy

```
# Log into Droplet
ssh root@167.99.192.228

# Pull and rebuild app
ggpur
npm run build

# Find running process
forever list

# Stop old server
forever stop {pid}

# Start new server
forever start -c "npm run start" ./
```
