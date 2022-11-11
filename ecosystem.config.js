module.exports = {
    apps: [
        {
            name: "365fullhd",
            exec_mode: "cluster",
            instances: "1", // Or a number of instances
            script: "./node_modules/nuxt/bin/nuxt.js",
            max_memory_restart: "256M",
            args: "start",
        },
    ],
};
