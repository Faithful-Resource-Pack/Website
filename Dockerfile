#########################
# Development Container #
#########################

# Defining the base image
FROM node:24-alpine AS dev

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Setting the variables for development
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Copy files
COPY . /app
WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Install dependencies
RUN pnpm i
RUN pnpm audit --fix
RUN pnpm cache delete

# Exposing the web & debug ports for the application
ARG PORT=3000
ARG HOST=0
ENV PORT=$PORT
ENV HOST=$HOST
EXPOSE $PORT 9229 9230

# Run the application
WORKDIR /app
CMD [ "pnpm", "run", "dev" ]

###############
# Build Phase #
###############

FROM dev AS build
WORKDIR /app

RUN corepack enable

# Copy prod env
COPY .env.example .env

# Build the project
RUN pnpm run build

########################
# Production container #
########################


FROM node:24-alpine AS prod

RUN mkdir -p /app/.output
WORKDIR /app/.output

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ .

RUN ls

# Exposing the web ports for the application
ARG PORT=3000
ARG HOST=0
ENV PORT=$PORT
ENV HOST=$HOST
EXPOSE $PORT

# CMD ["tail", "-f", "/dev/null"]  # For debug purposes only
CMD ["node", "server/index.mjs"]
