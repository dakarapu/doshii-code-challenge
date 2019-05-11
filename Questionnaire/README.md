# Doshii Questionnaire

1. Given the below infrastructure image, in your opinion, what improvements could be made? What could be considered a security or performance risk?
   ![infrastructure](./img/infra.png)

I can think of the below improvements from the picture:

API Gateway:

- Using AWS IAM roles and policies for security reasons
- Using tokens to get authoriation to APIs

Socket Service:

- Use of serverless websockets with AWS lambda for performance and reduces complexity and cost.

Redis:

- Should be inside private network and as it might be security risk.

Transaction Service: (taking message service (AWS SQS) as example here)

- SQS provides long polling (as it set to short polling by default), which can minimize empty responses and also very cost-effective.

2. In a hypothetical situation, AWS costs have been rising month to month by over 30%. What would you do to stem the rising costs?

Below are some points I would definitely look for:

- We can always start from the architecture point of view, collect all the fundamental information about the application and can downsize the unused resources. Also, it can be checked if the development environment is using any
  of these services.
- AWS provides several versions of tiers in their services, we can choose the cost-effective one. For example, EC2 instances are generally used to deploy applications, there are many flavors in it that serve the purpose. By choosing the right version can be cost-effective.
- Always track and monitor the resources in cloudwatch, this gives monitor log of your AWS resources and can be analyzed properly for cost redundance.
- One of the key features of AWS is the auto-scaling capability, this feature handles the application demand of resources and these are added only when required.

3. What would you consider to be the pros and cons of outsourcing software development? What about DevOps?

The points that comes to my mind on outsourcing:
cons:

- Chance of getting sub-standard quality output
- Inappropriate categorization of responsibilities
- Outsourced software vendor lacks customer focus
- There is always a chance of security vulnerabilities

pros:

- Development of software can be faster
- Increases the speed of delivery
- Needs less management and
- Cost-effective

Coming to the DevOps point of view, I would see the risk is more here. Because the in-house will have a better understanding
of a company's proprietary platform. Getting the right infrastructure requires foresight and expertise in the domain to build and maintain it.

4. What do you see as the responsibilities of a software developer?

Apart from the necessary technical skills, I would also see the below list as core responsibilites if someone is looking to see themselves growing:

- Clear understanding of the product and business requirements.
- Taking the ownership of the product and passion to improve it.
- Always be prepared for challenges and open to new technology.
