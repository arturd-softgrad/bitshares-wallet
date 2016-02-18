Prerequisites

1) go to project root directory
2) cd www
3) unpack node_modules_bsw.zip 
4) cd app\dl
5) npm install
6) cd ..\..\..
7) npm install cordova -g
8) cordova platform add android


Web build

1) go to project root directory
2) cd www
3) npm run build
4) set port = 5000
5) http-server <current directory path>
6) (optional) remove cookies, localstorage and web databases for localhost to clear applicaton settings
7) open localhost:5000


Build for Android

1) go to project root directory
2) cordova build android --debug
3) Resulting .apk file comes there - platforms\android\build\outputs\apk\android-debug.apk

