# How to execute
1. Execute `npm install` in both client and server folder
2. Compile client code: navigate into client directory and run `ng build --prod`
3. Copy client/dist content into server/static folder
4. Compile server code: navigate into server directory and run `tsc`
5. Check out the configuration is ok (c:/unibo-orientation/configuration.json, changeable through src/conf.ts)
6. Run: from server folder, run `node dist\main`
