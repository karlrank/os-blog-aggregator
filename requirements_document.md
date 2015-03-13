# OS Blog Aggregator : Requirements Document (version 1.2) #

Project: OS Blog Aggregator

Date(s): 15.09.2012

Prepared by: Marko Soomets, Karl Rankla, Arvi Kaasik, Gustav Amer

Document status:Proposed

## 1. Introduction ##
This document contains the system requirements for OS Blog Aggregator. These requirements have been derived from several sources, including brief listing of most important sources.

### 1.1 Purpose of This Document ###
This document is intended to guide development of OS Blog Aggregator. It will go through several stages during the course of the project:
  1. Draft: The first version, or draft version, is compiled after requirements have been discovered, recorded, classified, and prioritized.
  1. Proposed: The draft document is then proposed as a potential requirements specification for the project. The proposed document should be reviewed by several parties, who may comment on any requirements and any priorities, either to agree, to disagree, or to identify missing requirements. Readers include end-users, developers, project managers, and any other stakeholders. The document may be amended and reproposed several times before moving to the next stage.
  1. Validated: Once the various stakeholders have agreed to the requirements in the document, it is considered validated.
  1. Approved: The validated document is accepted by representatives of each party of stakeholders as an appropriate statement of requirements for the project. The developers then use the requirements document as a guide to implementation and to check the progress of the project as it develops.

### 1.2 How to Use This Document ###
We expect that this document will be used by people with different skill sets. This section explains which parts of this document should be reviewed by various types of readers.

Types of Reader
Development Team, Client


### 1.3 Scope of the Product ###
Create a suggestion engine mainly for books. The portal itself will also aggregate blogs.

### 1.4 Business Case for the Product ###
Two cases can be applied at first look.
  * Develop a subscription feature that only suggests blogs and books for subscribed users.
  * Another subscription feature that would create a e-book from blog posts - “weekly digest of blogs as e-book” for a small fee


### 1.5 Overview of the Requirements Document ###
Purpose of this project is to develop an application which imports feeds from other blogs, Amazon, Google Reader and other similar sites. It allows User to get easy access to his/her own blogs, modify the lists of blogs and receive suggestions on relevant topics.


## 2. General Description ##
This section will give the reader an overview of the project, including why it was conceived, what it will do when complete, and the types of people we expect will use it. We also list constraints that were faced during development and assumptions we made about how we would proceed.

### 2.1 Product Perspective ###
This product makes managing blogs easier. There may also be additional features to manage amazon books and google reader RSS feeds.

### 2.2 Product Functions ###
Application will help user manage his/her blog lists. It will also suggest user new and relevant blog lists and blogposts. The user can import and tag blog lists, make blog lists public and private.

### 2.3 User Characteristics ###
User does not need to have any technical background just a Google account. Only skills required from user is understanding of basic web browsing.


## 3. Specific Requirements ##
This section of the document lists specific requirements for OS Blog Aggregator. Requirements are divided into the following sections:
  1. Functional requirements.
  1. Non-Functional Requirements.


### 3.1 User Requirements ###

  * Application displays Blogs
    1. User can view their blogs on the main page [Issue 18](https://code.google.com/p/os-blog-aggregator/issues/detail?id=18)
    1. User can view their blog lists on the main page [Issue 29](https://code.google.com/p/os-blog-aggregator/issues/detail?id=29)
    1. User can see blogs/blog lists sorted by their date [Issue 18](https://code.google.com/p/os-blog-aggregator/issues/detail?id=18)
    1. [User can choose which list to display on Home page](SelectingBloglist.md) [Issue 30](https://code.google.com/p/os-blog-aggregator/issues/detail?id=30)
  * User management
    1. User can login with google account [Issue 13](https://code.google.com/p/os-blog-aggregator/issues/detail?id=13)
  * Tags are used
    1. Blogs can be tagged manually [Issue 32](https://code.google.com/p/os-blog-aggregator/issues/detail?id=32)
    1. Tags will be used when suggesting other users relevant blogs [Issue 33](https://code.google.com/p/os-blog-aggregator/issues/detail?id=33)
  * Blog lists/ Blogs can be managed
    1. [User can One-Click import Google Reader lists](ImportingBlogList.md) [Issue 34](https://code.google.com/p/os-blog-aggregator/issues/detail?id=34)
    1. User can add bloglists [Issue 27](https://code.google.com/p/os-blog-aggregator/issues/detail?id=27)
    1. [User can add and remove individual blogs](ImportingBlog.md) [Issue 35](https://code.google.com/p/os-blog-aggregator/issues/detail?id=35)
    1. [User can edit and delete blog lists](EditingBlog.md) [Issue 28](https://code.google.com/p/os-blog-aggregator/issues/detail?id=28)
    1. [User can mark blogs as recommended.](EditingBlog.md) [Issue 36](https://code.google.com/p/os-blog-aggregator/issues/detail?id=36)
  * Blog lists are public
  * Application suggests new blogs
    1. [Users are suggested blogs using tags](AccessingSuggestedBlog.md) [Issue 37](https://code.google.com/p/os-blog-aggregator/issues/detail?id=37)
    1. Users are suggested using their popularity [Issue 38](https://code.google.com/p/os-blog-aggregator/issues/detail?id=38)
    1. User's suggestions are based on user’s blogs [Issue 39](https://code.google.com/p/os-blog-aggregator/issues/detail?id=39)
    1. User will see blogs show up on Home page under “YOU MIGHT ALSO LIKE” section [Issue 40](https://code.google.com/p/os-blog-aggregator/issues/detail?id=40)
    1. [User will see blogs show up on My Blogs](AccessingOwnBlog.md) [Issue 26](https://code.google.com/p/os-blog-aggregator/issues/detail?id=26)
    1. If the suggestion engine doesn’t find any relevant blogs according to the user interests then posts from Top Blogs are suggested [Issue 41](https://code.google.com/p/os-blog-aggregator/issues/detail?id=41)
  * Able to manage blog list sharing [Issue 42](https://code.google.com/p/os-blog-aggregator/issues/detail?id=42)
    1. User is able to recommend list.
    1. User is able to share the list by link



### 3.2 Non-functional Requirements ###

  * Random user can learn the main functionalities of the application in some 5 minutes.
  * Application works on different browsers.
    1. Priority : Google Chrome
    1. Mozilla Firefox
    1. Opera
    1. Tablet browsers
    1. Mobile browsers are not officially supported
  * Relevant suggestions are made to user.
    1. Suggestions are made considering users imported blog lists
    1. If no relevant suggestions can be made, user is suggested most popular blogs

  * Application has a lightweight front-end
    1. No ore than 1 mb in downloads
  * Data is held in a relational database
  * The system shall ensure that data is protected from unauthorized access
  * User can change colors of user interface (at least two different skins)
  * No documentation required for end user - features are explained by icon with a brief description
  * First prototype will be in English - should also be translatable to other languages
  * In user interface no technical terms are used
  * The application will have 99% uptime
  * up to 500 simultaneous users will not cause performance decrease
  * up to 50000 users will not cause performance decrease



### 3.3 Prelimilary mock-up/prototype ###

![http://i.imgur.com/RypM7.jpg](http://i.imgur.com/RypM7.jpg)
Menu bar under Logo - “ Home - Top - My Blogs - About - Log in with Google “ (If hover over a page link it becomes underlined)
  * Home - Current page as seen on mockup. Has 2 basic sections, on  the left side are blogs that have been updated, on the right side there are blogs that are suggested to user.
  * Left section - There is a list of blogs, that have been recently updated. One blog has: blog name, time of update (hour, minute, date).
  * Blog posts have title + blog name where the post is from. First few lines of the post are shown also. Title can be clicked - routes to location of the post. “More...” button TBD!!!
  * Right tab - “YOU MIGHT ALSO LIKE” tab - Shows blogs relevant to the users interests and blogs. As “Raamatuteemaline blogi” there should be a name of a blog that is suggested to user.
  * “More” button shows more information about the blog. “Add” button shows player the blog adding interface in which he can assign the blog to a certain list.
  * Top - Shows blogs that are most popular amongst users
  * My Blogs - Opens My Blogs interface where the user can   Add/Remove/Edit/Import his blog lists and can also manage them by sharing or copying to other users.
  * Search - Opens the search interface where user can search for blogs using tags or blog names (Not planned anymore)
  * About - Shows brief information about the makers of the page and the purpose of the application, also an e-mail address where the user can turn to with his questions
  * Log in with Google - Opens a new interface where the user can log in with his Google account



## 4. High-Level Technology Architecture ##
  * web-based
  * java servlets
  * spring
  * google feed api
  * google reader api
  * source code will be held in Google Code

## 5. Customer Support ##


Users with problems send E-mails with their problems and receive replies regarding their problems from tech support/enthusiast

## 6. Glossary ##


> Blog list - collection of blogs. Imported as xml from Google reader

> Blog  - feed from a single blog. It will be derived from blog list.

> Imported item - single item that can be imported from other systems like a) blog list from Google Reader, b) Wishlist from Amazon

> Suggested item - single item that will suggested by the portal “black magic box” will be a) blog list, b) blog, c) blog post, d) book.

> Recommended item - single item that will be recomended by user for other users like a) blog list, b) blog, c) blog post, d) book

> Subscribed item - single item that can be subscribed are a) blog list, b) blog.

> Tag - Tags are ideally generic keywords relevant to the blog/book (Author, genre, subject etc.)

> Weekly digest - collection or blog posts that will be formated as epub or mobi and are downloadable from the portal