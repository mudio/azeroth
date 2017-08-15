/**
 * Azeroth - Runtime - Purge
 *
 * @file purge.js
 * @author mudio(job.mudio@gmail.com)
 */

/**
 * Traverses the cache to search for all the cached
 * files of the specified module name
 */
export const searchCache = (moduleName, callback) => {
    // Resolve the module identified by the specified name
    let mod = require.resolve(moduleName);

    // Check if the module has been resolved and found within
    // the cache
    if (mod && ((mod = require.cache[mod]) !== undefined)) { // eslint-disable-line no-cond-assign
        // Recursively go over the results
        (function traverse(_mod) {
            // Go over each of the module's children and
            // traverse them
            _mod.children.forEach((child) => {
                traverse(child);
            });

            // Call the specified callback providing the
            // found cached module
            callback(_mod);
        }(mod));
    }
};

/**
 * Removes a module from the cache
 */
export const purgeCache = (moduleName) => {
    // Traverse the cache looking for the files
    // loaded by the specified module name
    searchCache(moduleName, (mod) => {
        delete require.cache[mod.id];
    });

    // Remove cached paths to the module.
    // Thanks to @bentael for pointing this out.
    Object.keys(module.constructor._pathCache).forEach((cacheKey) => {
        if (cacheKey.indexOf(moduleName) > 0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};
