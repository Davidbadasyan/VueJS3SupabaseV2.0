# VueJS3SupabaseV2.0
VueJS3 App using Supabase V2.0

## Installation and services creation

> How to run the solution
```
npm install
npm run dev
```

> To change the config settings go to the .env.local file and set the following
```
VITE_SUPAURL=xxxx
VITE_SUPAKEY=xxxx
```
>To get VITE_SUPAURL and VITE_SUPAKEY you need to create a project from [Supabase Dashboard](https://supabase.com/dashboard/projects).

>You can create Google client from [here](https://console.cloud.google.com/projectselector2/apis/credentials?supportedpurview=project) by clicking Create Project.
>
>You can create Azure client by following [this](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).


## How Auth works
When logging in Supabase gives us access_token and we keep it in the local storage. When user tries to do some private action, access token expiration date is being compared with the current date. If token is expired user is being redirected to login page and needs to login again.

