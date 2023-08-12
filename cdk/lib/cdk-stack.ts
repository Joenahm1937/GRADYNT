import * as cdk from "aws-cdk-lib";
import { aws_s3 as s3, aws_s3_deployment as s3Deploy } from "aws-cdk-lib";
import * as s3assets from "aws-cdk-lib/aws-s3-assets";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import path = require("path");

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create the S3 Bucket
        const gradyntClientBucket = new s3.Bucket(this, "GradyntClientBucket", {
            removalPolicy: cdk.RemovalPolicy.DESTROY, // Since GRADYNT is still in development/testing phase
            websiteIndexDocument: "index.html",
        });

        // Used to let Cloudfront access S3 contents
        const oai = new cloudfront.OriginAccessIdentity(this, "GradyntOAI");

        // Our Cloudfront CDN
        const distribution = new cloudfront.CloudFrontWebDistribution(
            this,
            "GradyntClientCFDistribution",
            {
                originConfigs: [
                    {
                        s3OriginSource: {
                            s3BucketSource: gradyntClientBucket,
                            originAccessIdentity: oai,
                        },
                        behaviors: [{ isDefaultBehavior: true }],
                    },
                ],
            }
        );

        gradyntClientBucket.grantRead(oai); // This adds the necessary bucket policy allowing the OAI to read objects

        // Deploy the React Prod Build to the S3 Bucket
        new s3Deploy.BucketDeployment(this, "DeployGradyntClient", {
            sources: [s3Deploy.Source.asset("../client/build")],
            destinationBucket: gradyntClientBucket,
        });

        // Output the CloudFront URL
        new cdk.CfnOutput(this, "GradyntClientCFDistributionUrl", {
            value: distribution.distributionDomainName,
        });

        // TODO: Separate Below Server Related Constructs into Own Stack

        // // Create a new VPC
        // const vpc = new ec2.Vpc(this, "GradyntServerVPC", {
        //     maxAzs: 1, // Again, since GRADYNT is still in development/testing phase - should increase for production for redundancy
        // });

        // // Define a security group
        // const securityGroup = new ec2.SecurityGroup(this, "GradyntServerSG", {
        //     vpc: vpc,
        //     description: "Allow traffic to server",
        //     allowAllOutbound: true,
        // });

        // securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));
        // securityGroup.addIngressRule(ec2.Peer.anyIpv6(), ec2.Port.tcp(443));

        // // EC2 Role with permissions to read from S3
        // const ec2Role = new iam.Role(this, 'GradyntEC2Role', {
        //     assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
        // });
        
        // // Create an S3 asset from your server directory
        // const serverAsset = new s3assets.Asset(this, "GradyntServerCodeAsset", {
        //     path: path.join(__dirname, "../server"),
        // });

        // // Grant the EC2 instance permissions to read the asset from S3
        // serverAsset.grantRead(ec2Role);

        // // UserData for setting up Puppeteer, Chromium, and your server
        // const userData = ec2.UserData.forLinux();
        // userData.addCommands(
        //     'sudo yum update -y',
        //     'curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -', // Installing Node.js 18.x (Assuming 18.x exists)
        //     'sudo yum install -y nodejs',
        //     'rm -rf /tmp/server', // Removing the old server directory
        //     `aws s3 cp s3://${serverAsset.bucket.bucketName}/${serverAsset.s3ObjectKey} /tmp/server.zip`, // Copy from S3 to EC2
        //     'unzip /tmp/server.zip -d /tmp/server', // Unzip the contents
        //     'cd /tmp/server',
        //     'sudo yum install -y xorg-x11-server-Xvfb gtk2 libXtst libXScrnSaver GConf2 alsa-lib xorg-x11-fonts-* atk bridge-utils gtk3 -y', // Necessary libs for Puppeteer and Chromium
        //     'npm install', // Installing server dependencies
        //     'npm start' // Starting your server. Ensure your start script in package.json is appropriate
        // );

        // // Define the AMI for Ubuntu
        // const ami = new ec2.AmazonLinuxImage({
        //     generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
        // });

        // // Define EC2 instance
        // new ec2.Instance(this, "GradyntServerEC2", {
        //     vpc: vpc,
        //     instanceType: ec2.InstanceType.of(
        //         ec2.InstanceClass.T2,
        //         ec2.InstanceSize.MICRO
        //     ),
        //     machineImage: ami,
        //     securityGroup: securityGroup,
        //     userData: userData,
        //     role: ec2Role,
        // });
    }
}
