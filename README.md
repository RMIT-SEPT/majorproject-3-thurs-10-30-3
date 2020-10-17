# RMIT SEPT 2020 Major Project

# Group 3.THURS-10.30-3

## Members
* Brown, David (s3785894)
* Gust, Mitchell (s3782095)
* Lee, SangYeon (s3742751)

## Records
* Github repository : https://github.com/RMIT-SEPT/MajorProject-3-thurs-10-30-3
* Trello board : https://trello.com/b/jZ2e1aSF
* Google Drive (require RMIT email): https://bit.ly/2OYPsRL
* Deployed app on digital ocean: http://www.sept-dev.xyz

## Instructions

**To run the app, you will need**
1. Docker and kubernete running on your machine.
2. ```ingress-nginx``` installed on your local kubernete cluster.
3. Host name configuration(ex: ```127.0.0.1 sept.dev``` in your host config file)
4. Change host field in ```infra/ingess-srv.yaml``` to the url you specified on previous step.
5. Run command : ```kubectl apply -f infra```

**To deploy the application on Digital Ocean**
1. Create kubernete cluster in Digital ocean.
2. Copy access token.
3. Install docktl command line tool.
4. Access to cloud kubernete cluster with doctl and access token by running the following command.
5. Run command : ```doctl auth init --access-token <your-new-key>```
4. To see whether you are in digital ocean kubernete cluster : ```Kubectl config use-context ```
5. When you are in digital ocean kubernete context, apply config files by running the following command.
6. Run command : ```kubectl apply -f infra```