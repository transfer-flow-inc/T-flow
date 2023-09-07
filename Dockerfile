# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --ignore-scripts

# Generate the build of the application
ARG APP_ENV
RUN if [ "$APP_ENV" = "dev" ] ; then npm run build ; else npm run build:prod ; fi

# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest

# Copy the nginx conf for redirect when users try to access directly a URL
COPY nginx/default.conf /etc/nginx/nginx.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/ /usr/share/nginx/html


# Expose ports 80 and 443 for HTTP and HTTPS respectively
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
