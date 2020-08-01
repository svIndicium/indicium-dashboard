![Indicium Dashboard](indicium%20dashboard.svg)

Dashboard for managing all Indicium services, created with Vue. Live version available at [app.indicium.hu](https://app.indicium.hu/).

## 🚀 setup
1. Clone the repository with `git clone https://github.com/svIndicium/indicium-dashboard`.
2. Install dependencies using `npm install`.
3. Run the application using `npm run dev` to run the application in the development Auth0 environment or with `npm run live` to run it in the production environment.

You can also build the docker image! Build it using `docker build --build-arg VUE_APP_BRANCH=[dev/master] -t docker.pkg.github.com/svindicium/indicium-dashboard/dashboard:latest .`. Or pull it from our [Github Package Repository](https://github.com/svIndicium/indicium-dashboard/packages).
