# Requirements #

  * JAVA
  * [Ant](http://ant.apache.org/manual/install.html)
  * [Google App Engine SDK - Java](https://developers.google.com/appengine/downloads)
  * [MySql](http://dev.mysql.com/downloads/mysql/) instance
  * Mercurial

# Retrieve application from repo #

  1. Run: `hg clone http://code.google.com/p/os-blog-aggregator/`

# Build and Run Process #
  1. Set ant variables: "dbport", "dbuser", "dbpassword" in build.properties to their respective correct values
  1. If app has been previously installed on the machine Run: `ant drop-schema `
  1. Run: `ant create-schema `
  1. Run: `ant runserver`

# Deploy to appengine #
  1. Set ant variables "gae-email", "gae-password" in build.properties
  1. Set application name and version in war/WEB-INF/appengine-web.xml
  1. Set correct Correct Google Cloud SQL addresses in code (BloglistsServlet.java:42,72, ListManagerServlet.java:38,56,74,94)... will be made better later on...
  1. Run: `ant deploy-app`
# Run Tests #
  1. Run: `ant runtests` (actual tests will be run in the cloud(Saucelabs), on the staging environment)