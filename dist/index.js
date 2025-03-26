var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __reflectGet = Reflect.get;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// lib/index.ts
var index_exports = {};
__export(index_exports, {
  AnnotatedScreenshotText: () => AnnotatedScreenshotText,
  AvailableModelSchema: () => AvailableModelSchema,
  LLMClient: () => LLMClient,
  PlaywrightCommandException: () => PlaywrightCommandException,
  PlaywrightCommandMethodNotSupportedException: () => PlaywrightCommandMethodNotSupportedException,
  Stagehand: () => Stagehand3,
  StagehandFunctionName: () => StagehandFunctionName,
  applyStealthScripts: () => applyStealthScripts,
  defaultExtractSchema: () => defaultExtractSchema,
  operatorResponseSchema: () => operatorResponseSchema,
  operatorSummarySchema: () => operatorSummarySchema,
  pageTextSchema: () => pageTextSchema
});
module.exports = __toCommonJS(index_exports);
var import_sdk4 = require("@browserbasehq/sdk");
var import_test2 = require("@playwright/test");
var import_crypto2 = require("crypto");
var import_dotenv = __toESM(require("dotenv"));
var import_fs2 = __toESM(require("fs"));
var import_os = __toESM(require("os"));
var import_path2 = __toESM(require("path"));

// types/stagehand.ts
var StagehandFunctionName = /* @__PURE__ */ ((StagehandFunctionName2) => {
  StagehandFunctionName2["ACT"] = "ACT";
  StagehandFunctionName2["EXTRACT"] = "EXTRACT";
  StagehandFunctionName2["OBSERVE"] = "OBSERVE";
  return StagehandFunctionName2;
})(StagehandFunctionName || {});

// lib/StagehandPage.ts
var import_sdk = require("@browserbasehq/sdk");
var import_test = require("@playwright/test");

// types/page.ts
var import_zod = require("zod");
var defaultExtractSchema = import_zod.z.object({
  extraction: import_zod.z.string()
});
var pageTextSchema = import_zod.z.object({
  page_text: import_zod.z.string()
});

// types/playwright.ts
var PlaywrightCommandException = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PlaywrightCommandException";
  }
};
var PlaywrightCommandMethodNotSupportedException = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PlaywrightCommandMethodNotSupportedException";
  }
};

// lib/cache/BaseCache.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var crypto = __toESM(require("crypto"));
var BaseCache = class {
  constructor(logger, cacheDir = path.join(process.cwd(), "tmp", ".cache"), cacheFile = "cache.json") {
    this.CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
    // 1 week in milliseconds
    this.CLEANUP_PROBABILITY = 0.01;
    this.LOCK_TIMEOUT_MS = 1e3;
    this.lockAcquired = false;
    this.lockAcquireFailures = 0;
    // Added for request ID tracking
    this.requestIdToUsedHashes = {};
    this.logger = logger;
    this.cacheDir = cacheDir;
    this.cacheFile = path.join(cacheDir, cacheFile);
    this.lockFile = path.join(cacheDir, "cache.lock");
    this.ensureCacheDirectory();
    this.setupProcessHandlers();
  }
  setupProcessHandlers() {
    const releaseLockAndExit = () => {
      this.releaseLock();
      process.exit();
    };
    process.on("exit", releaseLockAndExit);
    process.on("SIGINT", releaseLockAndExit);
    process.on("SIGTERM", releaseLockAndExit);
    process.on("uncaughtException", (err) => {
      this.logger({
        category: "base_cache",
        message: "uncaught exception",
        level: 2,
        auxiliary: {
          error: {
            value: err.message,
            type: "string"
          },
          trace: {
            value: err.stack,
            type: "string"
          }
        }
      });
      if (this.lockAcquired) {
        releaseLockAndExit();
      }
    });
  }
  ensureCacheDirectory() {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
      this.logger({
        category: "base_cache",
        message: "created cache directory",
        level: 1,
        auxiliary: {
          cacheDir: {
            value: this.cacheDir,
            type: "string"
          }
        }
      });
    }
  }
  createHash(data) {
    const hash = crypto.createHash("sha256");
    return hash.update(JSON.stringify(data)).digest("hex");
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  acquireLock() {
    return __async(this, null, function* () {
      const startTime = Date.now();
      while (Date.now() - startTime < this.LOCK_TIMEOUT_MS) {
        try {
          if (fs.existsSync(this.lockFile)) {
            const lockAge = Date.now() - fs.statSync(this.lockFile).mtimeMs;
            if (lockAge > this.LOCK_TIMEOUT_MS) {
              fs.unlinkSync(this.lockFile);
              this.logger({
                category: "base_cache",
                message: "Stale lock file removed",
                level: 1
              });
            }
          }
          fs.writeFileSync(this.lockFile, process.pid.toString(), { flag: "wx" });
          this.lockAcquireFailures = 0;
          this.lockAcquired = true;
          this.logger({
            category: "base_cache",
            message: "Lock acquired",
            level: 1
          });
          return true;
        } catch (e) {
          this.logger({
            category: "base_cache",
            message: "error acquiring lock",
            level: 2,
            auxiliary: {
              trace: {
                value: e.stack,
                type: "string"
              },
              message: {
                value: e.message,
                type: "string"
              }
            }
          });
          yield this.sleep(5);
        }
      }
      this.logger({
        category: "base_cache",
        message: "Failed to acquire lock after timeout",
        level: 2
      });
      this.lockAcquireFailures++;
      if (this.lockAcquireFailures >= 3) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock 3 times in a row. Releasing lock manually.",
          level: 1
        });
        this.releaseLock();
      }
      return false;
    });
  }
  releaseLock() {
    try {
      if (fs.existsSync(this.lockFile)) {
        fs.unlinkSync(this.lockFile);
        this.logger({
          category: "base_cache",
          message: "Lock released",
          level: 1
        });
      }
      this.lockAcquired = false;
    } catch (error) {
      this.logger({
        category: "base_cache",
        message: "error releasing lock",
        level: 2,
        auxiliary: {
          error: {
            value: error.message,
            type: "string"
          },
          trace: {
            value: error.stack,
            type: "string"
          }
        }
      });
    }
  }
  /**
   * Cleans up stale cache entries that exceed the maximum age.
   */
  cleanupStaleEntries() {
    return __async(this, null, function* () {
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "llm_cache",
          message: "failed to acquire lock for cleanup",
          level: 2
        });
        return;
      }
      try {
        const cache = this.readCache();
        const now = Date.now();
        let entriesRemoved = 0;
        for (const [hash, entry] of Object.entries(cache)) {
          if (now - entry.timestamp > this.CACHE_MAX_AGE_MS) {
            delete cache[hash];
            entriesRemoved++;
          }
        }
        if (entriesRemoved > 0) {
          this.writeCache(cache);
          this.logger({
            category: "llm_cache",
            message: "cleaned up stale cache entries",
            level: 1,
            auxiliary: {
              entriesRemoved: {
                value: entriesRemoved.toString(),
                type: "integer"
              }
            }
          });
        }
      } catch (error) {
        this.logger({
          category: "llm_cache",
          message: "error during cache cleanup",
          level: 2,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
      } finally {
        this.releaseLock();
      }
    });
  }
  readCache() {
    if (fs.existsSync(this.cacheFile)) {
      try {
        const data = fs.readFileSync(this.cacheFile, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error reading cache file. resetting cache.",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
        this.resetCache();
        return {};
      }
    }
    return {};
  }
  writeCache(cache) {
    try {
      fs.writeFileSync(this.cacheFile, JSON.stringify(cache, null, 2));
      this.logger({
        category: "base_cache",
        message: "Cache written to file",
        level: 1
      });
    } catch (error) {
      this.logger({
        category: "base_cache",
        message: "error writing cache file",
        level: 2,
        auxiliary: {
          error: {
            value: error.message,
            type: "string"
          },
          trace: {
            value: error.stack,
            type: "string"
          }
        }
      });
    } finally {
      this.releaseLock();
    }
  }
  /**
   * Retrieves data from the cache based on the provided options.
   * @param hashObj - The options used to generate the cache key.
   * @param requestId - The identifier for the current request.
   * @returns The cached data if available, otherwise null.
   */
  get(hashObj, requestId) {
    return __async(this, null, function* () {
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock for getting cache",
          level: 2
        });
        return null;
      }
      try {
        const hash = this.createHash(hashObj);
        const cache = this.readCache();
        if (cache[hash]) {
          this.trackRequestIdUsage(requestId, hash);
          return cache[hash].data;
        }
        return null;
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error getting cache. resetting cache.",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
        this.resetCache();
        return null;
      } finally {
        this.releaseLock();
      }
    });
  }
  /**
   * Stores data in the cache based on the provided options and requestId.
   * @param hashObj - The options used to generate the cache key.
   * @param data - The data to be cached.
   * @param requestId - The identifier for the cache entry.
   */
  set(hashObj, data, requestId) {
    return __async(this, null, function* () {
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock for setting cache",
          level: 2
        });
        return;
      }
      try {
        const hash = this.createHash(hashObj);
        const cache = this.readCache();
        cache[hash] = {
          data,
          timestamp: Date.now(),
          requestId
        };
        this.writeCache(cache);
        this.trackRequestIdUsage(requestId, hash);
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error setting cache. resetting cache.",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
        this.resetCache();
      } finally {
        this.releaseLock();
        if (Math.random() < this.CLEANUP_PROBABILITY) {
          this.cleanupStaleEntries();
        }
      }
    });
  }
  delete(hashObj) {
    return __async(this, null, function* () {
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock for removing cache entry",
          level: 2
        });
        return;
      }
      try {
        const hash = this.createHash(hashObj);
        const cache = this.readCache();
        if (cache[hash]) {
          delete cache[hash];
          this.writeCache(cache);
        } else {
          this.logger({
            category: "base_cache",
            message: "Cache entry not found to delete",
            level: 1
          });
        }
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error removing cache entry",
          level: 2,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
      } finally {
        this.releaseLock();
      }
    });
  }
  /**
   * Tracks the usage of a hash with a specific requestId.
   * @param requestId - The identifier for the current request.
   * @param hash - The cache key hash.
   */
  trackRequestIdUsage(requestId, hash) {
    var _a, _b;
    (_b = (_a = this.requestIdToUsedHashes)[requestId]) != null ? _b : _a[requestId] = [];
    this.requestIdToUsedHashes[requestId].push(hash);
  }
  /**
   * Deletes all cache entries associated with a specific requestId.
   * @param requestId - The identifier for the request whose cache entries should be deleted.
   */
  deleteCacheForRequestId(requestId) {
    return __async(this, null, function* () {
      var _a;
      if (!(yield this.acquireLock())) {
        this.logger({
          category: "base_cache",
          message: "Failed to acquire lock for deleting cache",
          level: 2
        });
        return;
      }
      try {
        const cache = this.readCache();
        const hashes = (_a = this.requestIdToUsedHashes[requestId]) != null ? _a : [];
        let entriesRemoved = 0;
        for (const hash of hashes) {
          if (cache[hash]) {
            delete cache[hash];
            entriesRemoved++;
          }
        }
        if (entriesRemoved > 0) {
          this.writeCache(cache);
        } else {
          this.logger({
            category: "base_cache",
            message: "no cache entries found for requestId",
            level: 1,
            auxiliary: {
              requestId: {
                value: requestId,
                type: "string"
              }
            }
          });
        }
        delete this.requestIdToUsedHashes[requestId];
      } catch (error) {
        this.logger({
          category: "base_cache",
          message: "error deleting cache for requestId",
          level: 2,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            },
            requestId: {
              value: requestId,
              type: "string"
            }
          }
        });
      } finally {
        this.releaseLock();
      }
    });
  }
  /**
   * Resets the entire cache by clearing the cache file.
   */
  resetCache() {
    try {
      fs.writeFileSync(this.cacheFile, "{}");
      this.requestIdToUsedHashes = {};
    } catch (error) {
      this.logger({
        category: "base_cache",
        message: "error resetting cache",
        level: 2,
        auxiliary: {
          error: {
            value: error.message,
            type: "string"
          },
          trace: {
            value: error.stack,
            type: "string"
          }
        }
      });
    } finally {
      this.releaseLock();
    }
  }
};

// lib/cache/ActionCache.ts
var ActionCache = class _ActionCache extends BaseCache {
  constructor(logger, cacheDir, cacheFile) {
    super(logger, cacheDir, cacheFile || "action_cache.json");
  }
  addActionStep(_0) {
    return __async(this, arguments, function* ({
      url,
      action,
      previousSelectors,
      playwrightCommand,
      componentString,
      xpaths,
      newStepString,
      completed,
      requestId
    }) {
      this.logger({
        category: "action_cache",
        message: "adding action step to cache",
        level: 1,
        auxiliary: {
          action: {
            value: action,
            type: "string"
          },
          requestId: {
            value: requestId,
            type: "string"
          },
          url: {
            value: url,
            type: "string"
          },
          previousSelectors: {
            value: JSON.stringify(previousSelectors),
            type: "object"
          }
        }
      });
      yield this.set(
        { url, action, previousSelectors },
        {
          playwrightCommand,
          componentString,
          xpaths,
          newStepString,
          completed,
          previousSelectors,
          action
        },
        requestId
      );
    });
  }
  /**
   * Retrieves all actions for a specific trajectory.
   * @param trajectoryId - Unique identifier for the trajectory.
   * @param requestId - The identifier for the current request.
   * @returns An array of TrajectoryEntry objects or null if not found.
   */
  getActionStep(_0) {
    return __async(this, arguments, function* ({
      url,
      action,
      previousSelectors,
      requestId
    }) {
      const data = yield __superGet(_ActionCache.prototype, this, "get").call(this, { url, action, previousSelectors }, requestId);
      if (!data) {
        return null;
      }
      return data;
    });
  }
  removeActionStep(cacheHashObj) {
    return __async(this, null, function* () {
      yield __superGet(_ActionCache.prototype, this, "delete").call(this, cacheHashObj);
    });
  }
  /**
   * Clears all actions for a specific trajectory.
   * @param trajectoryId - Unique identifier for the trajectory.
   * @param requestId - The identifier for the current request.
   */
  clearAction(requestId) {
    return __async(this, null, function* () {
      yield __superGet(_ActionCache.prototype, this, "deleteCacheForRequestId").call(this, requestId);
      this.logger({
        category: "action_cache",
        message: "cleared action for ID",
        level: 1,
        auxiliary: {
          requestId: {
            value: requestId,
            type: "string"
          }
        }
      });
    });
  }
  /**
   * Resets the entire action cache.
   */
  resetCache() {
    return __async(this, null, function* () {
      yield __superGet(_ActionCache.prototype, this, "resetCache").call(this);
      this.logger({
        category: "action_cache",
        message: "Action cache has been reset.",
        level: 1
      });
    });
  }
};

// lib/inference.ts
var import_zod2 = require("zod");

// lib/prompt.ts
var actSystemPrompt = `
# Instructions
You are a browser automation assistant. Your job is to accomplish the user's goal across multiple model calls by running playwright commands.

## Input
You will receive:
1. the user's overall goal
2. the steps that you've taken so far
3. a list of active DOM elements in this chunk to consider to get closer to the goal. 
4. Optionally, a list of variable names that the user has provided that you may use to accomplish the goal. To use the variables, you must use the special <|VARIABLE_NAME|> syntax.
5. Optionally, custom instructions will be provided by the user. If the user's instructions are not relevant to the current task, ignore them. Otherwise, make sure to adhere to them.


## Your Goal / Specification
You have 2 tools that you can call: doAction, and skipSection. Do action only performs Playwright actions. Do exactly what the user's goal is. Do not perform any other actions or exceed the scope of the goal.
If the user's goal will be accomplished after running the playwright action, set completed to true. Better to have completed set to true if your are not sure.

Note 1: If there is a popup on the page for cookies or advertising that has nothing to do with the goal, try to close it first before proceeding. As this can block the goal from being completed.
Note 2: Sometimes what your are looking for is hidden behind and element you need to interact with. For example, sliders, buttons, etc...

Again, if the user's goal will be accomplished after running the playwright action, set completed to true. Also, if the user provides custom instructions, it is imperative that you follow them no matter what.
`;
var verifyActCompletionSystemPrompt = `
You are a browser automation assistant. The job has given you a goal and a list of steps that have been taken so far. Your job is to determine if the user's goal has been completed based on the provided information.

# Input
You will receive:
1. The user's goal: A clear description of what the user wants to achieve.
2. Steps taken so far: A list of actions that have been performed up to this point.

# Your Task
Analyze the provided information to determine if the user's goal has been fully completed.

# Output
Return a boolean value:
- true: If the goal has been definitively completed based on the steps taken and the current page.
- false: If the goal has not been completed or if there's any uncertainty about its completion.

# Important Considerations
- False positives are okay. False negatives are not okay.
- Look for evidence of errors on the page or something having gone wrong in completing the goal. If one does not exist, return true.
`;
function buildVerifyActCompletionSystemPrompt() {
  return {
    role: "system",
    content: verifyActCompletionSystemPrompt
  };
}
function buildVerifyActCompletionUserPrompt(goal, steps = "None", domElements) {
  let actUserPrompt = `
# My Goal
${goal}

# Steps You've Taken So Far
${steps}
`;
  if (domElements) {
    actUserPrompt += `
# Active DOM Elements on the current page
${domElements}
`;
  }
  return {
    role: "user",
    content: actUserPrompt
  };
}
function buildUserInstructionsString(userProvidedInstructions) {
  if (!userProvidedInstructions) {
    return "";
  }
  return `

# Custom Instructions Provided by the User
    
Please keep the user's instructions in mind when performing actions. If the user's instructions are not relevant to the current task, ignore them.

User Instructions:
${userProvidedInstructions}`;
}
function buildActSystemPrompt(userProvidedInstructions) {
  return {
    role: "system",
    content: [
      actSystemPrompt,
      buildUserInstructionsString(userProvidedInstructions)
    ].filter(Boolean).join("\n\n")
  };
}
function buildActUserPrompt(action, steps = "None", domElements, variables) {
  let actUserPrompt = `
# My Goal
${action}

# Steps You've Taken So Far
${steps}

# Current Active Dom Elements
${domElements}
`;
  if (variables && Object.keys(variables).length > 0) {
    actUserPrompt += `
# Variables
${Object.keys(variables).map((key) => `<|${key.toUpperCase()}|>`).join("\n")}
`;
  }
  return {
    role: "user",
    content: actUserPrompt
  };
}
var actTools = [
  {
    type: "function",
    name: "doAction",
    description: "execute the next playwright step that directly accomplishes the goal",
    parameters: {
      type: "object",
      required: ["method", "element", "args", "step", "completed"],
      properties: {
        method: {
          type: "string",
          description: "The playwright function to call."
        },
        element: {
          type: "number",
          description: "The element number to act on"
        },
        args: {
          type: "array",
          description: "The required arguments",
          items: {
            type: "string",
            description: "The argument to pass to the function"
          }
        },
        step: {
          type: "string",
          description: "human readable description of the step that is taken in the past tense. Please be very detailed."
        },
        why: {
          type: "string",
          description: "why is this step taken? how does it advance the goal?"
        },
        completed: {
          type: "boolean",
          description: "true if the goal should be accomplished after this step"
        }
      }
    }
  },
  {
    type: "function",
    name: "skipSection",
    description: "skips this area of the webpage because the current goal cannot be accomplished here",
    parameters: {
      type: "object",
      properties: {
        reason: {
          type: "string",
          description: "reason that no action is taken"
        }
      }
    }
  }
];
function buildExtractSystemPrompt(isUsingPrintExtractedDataTool = false, useTextExtract = true, userProvidedInstructions) {
  const baseContent = `You are extracting content on behalf of a user.
  If a user asks you to extract a 'list' of information, or 'all' information, 
  YOU MUST EXTRACT ALL OF THE INFORMATION THAT THE USER REQUESTS.
   
  You will be given:
1. An instruction
2. `;
  const contentDetail = useTextExtract ? `A text representation of a webpage to extract information from.` : `A list of DOM elements to extract from.`;
  const instructions = `
Print the exact text from the ${useTextExtract ? "text-rendered webpage" : "DOM elements"} with all symbols, characters, and endlines as is.
Print null or an empty string if no new information is found.
  `.trim();
  const toolInstructions = isUsingPrintExtractedDataTool ? `
ONLY print the content using the print_extracted_data tool provided.
ONLY print the content using the print_extracted_data tool provided.
  `.trim() : "";
  const additionalInstructions = useTextExtract ? `Once you are given the text-rendered webpage, 
    you must thoroughly and meticulously analyze it. Be very careful to ensure that you
    do not miss any important information.` : "";
  const userInstructions = buildUserInstructionsString(
    userProvidedInstructions
  );
  const content = `${baseContent}${contentDetail}

${instructions}
${toolInstructions}${additionalInstructions ? `

${additionalInstructions}` : ""}${userInstructions ? `

${userInstructions}` : ""}`.replace(/\s+/g, " ");
  return {
    role: "system",
    content
  };
}
function buildExtractUserPrompt(instruction, domElements, isUsingPrintExtractedDataTool = false) {
  let content = `Instruction: ${instruction}
DOM: ${domElements}`;
  if (isUsingPrintExtractedDataTool) {
    content += `
ONLY print the content using the print_extracted_data tool provided.
ONLY print the content using the print_extracted_data tool provided.`;
  }
  return {
    role: "user",
    content
  };
}
var refineSystemPrompt = `You are tasked with refining and filtering information for the final output based on newly extracted and previously extracted content. Your responsibilities are:
1. Remove exact duplicates for elements in arrays and objects.
2. For text fields, append or update relevant text if the new content is an extension, replacement, or continuation.
3. For non-text fields (e.g., numbers, booleans), update with new values if they differ.
4. Add any completely new fields or objects ONLY IF they correspond to the provided schema.

Return the updated content that includes both the previous content and the new, non-duplicate, or extended information.`;
function buildRefineSystemPrompt() {
  return {
    role: "system",
    content: refineSystemPrompt
  };
}
function buildRefineUserPrompt(instruction, previouslyExtractedContent, newlyExtractedContent) {
  return {
    role: "user",
    content: `Instruction: ${instruction}
Previously extracted content: ${JSON.stringify(previouslyExtractedContent, null, 2)}
Newly extracted content: ${JSON.stringify(newlyExtractedContent, null, 2)}
Refined content:`
  };
}
var metadataSystemPrompt = `You are an AI assistant tasked with evaluating the progress and completion status of an extraction task.
Analyze the extraction response and determine if the task is completed or if more information is needed.

Strictly abide by the following criteria:
1. Once the instruction has been satisfied by the current extraction response, ALWAYS set completion status to true and stop processing, regardless of remaining chunks.
2. Only set completion status to false if BOTH of these conditions are true:
   - The instruction has not been satisfied yet
   - There are still chunks left to process (chunksTotal > chunksSeen)`;
function buildMetadataSystemPrompt() {
  return {
    role: "system",
    content: metadataSystemPrompt
  };
}
function buildMetadataPrompt(instruction, extractionResponse, chunksSeen, chunksTotal) {
  return {
    role: "user",
    content: `Instruction: ${instruction}
Extracted content: ${JSON.stringify(extractionResponse, null, 2)}
chunksSeen: ${chunksSeen}
chunksTotal: ${chunksTotal}`
  };
}
function buildObserveSystemPrompt(userProvidedInstructions, isUsingAccessibilityTree = false) {
  const observeSystemPrompt = `
You are helping the user automate the browser by finding elements based on what the user wants to observe in the page.

You will be given:
1. a instruction of elements to observe
2. ${isUsingAccessibilityTree ? "a hierarchical accessibility tree showing the semantic structure of the page. The tree is a hybrid of the DOM and the accessibility tree." : "a numbered list of possible elements"}

Return an array of elements that match the instruction if they exist, otherwise return an empty array.`;
  const content = observeSystemPrompt.replace(/\s+/g, " ");
  return {
    role: "system",
    content: [content, buildUserInstructionsString(userProvidedInstructions)].filter(Boolean).join("\n\n")
  };
}
function buildObserveUserMessage(instruction, domElements, isUsingAccessibilityTree = false) {
  return {
    role: "user",
    content: `instruction: ${instruction}
${isUsingAccessibilityTree ? "Accessibility Tree" : "DOM"}: ${domElements}`
  };
}
function buildActObservePrompt(action, supportedActions, variables) {
  let instruction = `Find the most relevant element to perform an action on given the following action: ${action}. 
  Provide an action for this element such as ${supportedActions.join(", ")}, or any other playwright locator method. Remember that to users, buttons and links look the same in most cases.
  If the action is completely unrelated to a potential action to be taken on the page, return an empty array. 
  ONLY return one action. If multiple actions are relevant, return the most relevant one. If the user is asking to scroll to a position on the page, e.g., 'halfway' or 0.75, etc, you must return the argument formatted as the correct percentage, e.g., '50%' or '75%', etc.`;
  if (variables && Object.keys(variables).length > 0) {
    const variablesPrompt = `The following variables are available to use in the action: ${Object.keys(variables).join(", ")}. Fill the argument variables with the variable name.`;
    instruction += ` ${variablesPrompt}`;
  }
  return instruction;
}
function buildOperatorSystemPrompt(goal) {
  return {
    role: "system",
    content: `You are a general-purpose agent whose job is to accomplish the user's goal across multiple model calls by running actions on the page.

You will be given a goal and a list of steps that have been taken so far. Your job is to determine if either the user's goal has been completed or if there are still steps that need to be taken.

# Your current goal
${goal}

# Important guidelines
1. Break down complex actions into individual atomic steps
2. For \`act\` commands, use only one action at a time, such as:
   - Single click on a specific element
   - Type into a single input field
   - Select a single option
3. Avoid combining multiple actions in one instruction
4. If multiple actions are needed, they should be separate steps`
  };
}

// lib/inferenceLogUtils.ts
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
function ensureInferenceSummaryDir() {
  const inferenceDir = import_path.default.join(process.cwd(), "inference_summary");
  if (!import_fs.default.existsSync(inferenceDir)) {
    import_fs.default.mkdirSync(inferenceDir, { recursive: true });
  }
  return inferenceDir;
}
function appendSummary(inferenceType, entry) {
  const summaryPath = getSummaryJsonPath(inferenceType);
  const arrayKey = `${inferenceType}_summary`;
  const existingData = readSummaryFile(inferenceType);
  existingData[arrayKey].push(entry);
  import_fs.default.writeFileSync(summaryPath, JSON.stringify(existingData, null, 2));
}
function getTimestamp() {
  return (/* @__PURE__ */ new Date()).toISOString().replace(/[^0-9T]/g, "").replace("T", "_");
}
function writeTimestampedTxtFile(directory, prefix, data) {
  const baseDir = ensureInferenceSummaryDir();
  const subDir = import_path.default.join(baseDir, directory);
  if (!import_fs.default.existsSync(subDir)) {
    import_fs.default.mkdirSync(subDir, { recursive: true });
  }
  const timestamp = getTimestamp();
  const fileName = `${timestamp}_${prefix}.txt`;
  const filePath = import_path.default.join(subDir, fileName);
  import_fs.default.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2).replace(/\\n/g, "\n")
  );
  return { fileName, timestamp };
}
function getSummaryJsonPath(inferenceType) {
  const baseDir = ensureInferenceSummaryDir();
  const subDir = import_path.default.join(baseDir, `${inferenceType}_summary`);
  if (!import_fs.default.existsSync(subDir)) {
    import_fs.default.mkdirSync(subDir, { recursive: true });
  }
  return import_path.default.join(subDir, `${inferenceType}_summary.json`);
}
function readSummaryFile(inferenceType) {
  const summaryPath = getSummaryJsonPath(inferenceType);
  const arrayKey = `${inferenceType}_summary`;
  if (!import_fs.default.existsSync(summaryPath)) {
    return { [arrayKey]: [] };
  }
  try {
    const raw = import_fs.default.readFileSync(summaryPath, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && Array.isArray(parsed[arrayKey])) {
      return parsed;
    }
  } catch (e) {
  }
  return { [arrayKey]: [] };
}

// lib/inference.ts
function fillInVariables(text, variables) {
  let processedText = text;
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `<|${key.toUpperCase()}|>`;
    processedText = processedText.replace(placeholder, value);
  });
  return processedText;
}
function verifyActCompletion(_0) {
  return __async(this, arguments, function* ({
    goal,
    steps,
    llmClient,
    domElements,
    logger,
    requestId,
    logInferenceToFile = false
  }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const verificationSchema = import_zod2.z.object({
      completed: import_zod2.z.boolean().describe("true if the goal is accomplished")
    });
    const messages = [
      buildVerifyActCompletionSystemPrompt(),
      buildVerifyActCompletionUserPrompt(goal, steps, domElements)
    ];
    let callFile = "";
    let callTimestamp = "";
    if (logInferenceToFile) {
      const callResult = writeTimestampedTxtFile("act_summary", "verify_call", {
        requestId,
        modelCall: "verifyActCompletion",
        messages
      });
      callFile = callResult.fileName;
      callTimestamp = callResult.timestamp;
    }
    const start = Date.now();
    const rawResponse = yield llmClient.createChatCompletion({
      options: {
        messages,
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_model: {
          name: "Verification",
          schema: verificationSchema
        },
        requestId
      },
      logger
    });
    const end = Date.now();
    const inferenceTimeMs = end - start;
    const parsedResponse = rawResponse;
    const verificationData = parsedResponse.data;
    const verificationUsage = parsedResponse.usage;
    let responseFile = "";
    if (logInferenceToFile) {
      const responseResult = writeTimestampedTxtFile(
        "act_summary",
        "verify_response",
        {
          requestId,
          modelResponse: "verifyActCompletion",
          rawResponse: verificationData
        }
      );
      responseFile = responseResult.fileName;
      appendSummary("act", {
        act_inference_type: "verifyActCompletion",
        timestamp: callTimestamp,
        LLM_input_file: callFile,
        LLM_output_file: responseFile,
        prompt_tokens: (_a = verificationUsage == null ? void 0 : verificationUsage.prompt_tokens) != null ? _a : 0,
        completion_tokens: (_b = verificationUsage == null ? void 0 : verificationUsage.completion_tokens) != null ? _b : 0,
        inference_time_ms: inferenceTimeMs
      });
    }
    if (!verificationData || typeof verificationData !== "object") {
      logger({
        category: "VerifyAct",
        message: "Unexpected response format: " + JSON.stringify(parsedResponse)
      });
      return {
        completed: false,
        prompt_tokens: (_c = verificationUsage == null ? void 0 : verificationUsage.prompt_tokens) != null ? _c : 0,
        completion_tokens: (_d = verificationUsage == null ? void 0 : verificationUsage.completion_tokens) != null ? _d : 0,
        inference_time_ms: inferenceTimeMs
      };
    }
    if (verificationData.completed === void 0) {
      logger({
        category: "VerifyAct",
        message: "Missing 'completed' field in response"
      });
      return {
        completed: false,
        prompt_tokens: (_e = verificationUsage == null ? void 0 : verificationUsage.prompt_tokens) != null ? _e : 0,
        completion_tokens: (_f = verificationUsage == null ? void 0 : verificationUsage.completion_tokens) != null ? _f : 0,
        inference_time_ms: inferenceTimeMs
      };
    }
    return {
      completed: verificationData.completed,
      prompt_tokens: (_g = verificationUsage == null ? void 0 : verificationUsage.prompt_tokens) != null ? _g : 0,
      completion_tokens: (_h = verificationUsage == null ? void 0 : verificationUsage.completion_tokens) != null ? _h : 0,
      inference_time_ms: inferenceTimeMs
    };
  });
}
function act(_0) {
  return __async(this, arguments, function* ({
    action,
    domElements,
    steps,
    llmClient,
    retries = 0,
    logger,
    requestId,
    variables,
    userProvidedInstructions,
    onActMetrics,
    logInferenceToFile = false
  }) {
    var _a, _b, _c, _d, _e;
    const messages = [
      buildActSystemPrompt(userProvidedInstructions),
      buildActUserPrompt(action, steps, domElements, variables)
    ];
    let callFile = "";
    let callTimestamp = "";
    if (logInferenceToFile) {
      const callResult = writeTimestampedTxtFile("act_summary", "act_call", {
        requestId,
        modelCall: "act",
        messages
      });
      callFile = callResult.fileName;
      callTimestamp = callResult.timestamp;
    }
    const start = Date.now();
    const rawResponse = yield llmClient.createChatCompletion({
      options: {
        messages,
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        tool_choice: "auto",
        tools: actTools,
        requestId
      },
      logger
    });
    const end = Date.now();
    const inferenceTimeMs = end - start;
    let responseFile = "";
    if (logInferenceToFile) {
      const responseResult = writeTimestampedTxtFile(
        "act_summary",
        "act_response",
        {
          requestId,
          modelResponse: "act",
          rawResponse
        }
      );
      responseFile = responseResult.fileName;
    }
    const usageData = rawResponse.usage;
    const promptTokens = (_a = usageData == null ? void 0 : usageData.prompt_tokens) != null ? _a : 0;
    const completionTokens = (_b = usageData == null ? void 0 : usageData.completion_tokens) != null ? _b : 0;
    if (logInferenceToFile) {
      appendSummary("act", {
        act_inference_type: "act",
        timestamp: callTimestamp,
        LLM_input_file: callFile,
        LLM_output_file: responseFile,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        inference_time_ms: inferenceTimeMs
      });
    }
    if (onActMetrics) {
      onActMetrics(promptTokens, completionTokens, inferenceTimeMs);
    }
    const toolCalls = (_e = (_d = (_c = rawResponse.choices) == null ? void 0 : _c[0]) == null ? void 0 : _d.message) == null ? void 0 : _e.tool_calls;
    if (toolCalls && toolCalls.length > 0) {
      if (toolCalls[0].function.name === "skipSection") {
        return null;
      }
      return JSON.parse(toolCalls[0].function.arguments);
    } else {
      if (retries >= 2) {
        logger({
          category: "Act",
          message: "No tool calls found in response after multiple retries."
        });
        return null;
      }
      return act({
        action,
        domElements,
        steps,
        llmClient,
        retries: retries + 1,
        logger,
        requestId,
        variables,
        userProvidedInstructions,
        onActMetrics,
        logInferenceToFile
      });
    }
  });
}
function extract(_0) {
  return __async(this, arguments, function* ({
    instruction,
    previouslyExtractedContent,
    domElements,
    schema,
    llmClient,
    chunksSeen,
    chunksTotal,
    requestId,
    logger,
    isUsingTextExtract,
    userProvidedInstructions,
    logInferenceToFile = false
  }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const metadataSchema = import_zod2.z.object({
      progress: import_zod2.z.string().describe(
        "progress of what has been extracted so far, as concise as possible"
      ),
      completed: import_zod2.z.boolean().describe(
        "true if the goal is now accomplished. Use this conservatively, only when sure that the goal has been completed."
      )
    });
    const isUsingAnthropic = llmClient.type === "anthropic";
    const extractCallMessages = [
      buildExtractSystemPrompt(
        isUsingAnthropic,
        isUsingTextExtract,
        userProvidedInstructions
      ),
      buildExtractUserPrompt(instruction, domElements, isUsingAnthropic)
    ];
    let extractCallFile = "";
    let extractCallTimestamp = "";
    if (logInferenceToFile) {
      const { fileName, timestamp } = writeTimestampedTxtFile(
        "extract_summary",
        "extract_call",
        {
          requestId,
          modelCall: "extract",
          messages: extractCallMessages
        }
      );
      extractCallFile = fileName;
      extractCallTimestamp = timestamp;
    }
    const extractStartTime = Date.now();
    const extractionResponse = yield llmClient.createChatCompletion({
      options: {
        messages: extractCallMessages,
        response_model: {
          schema,
          name: "Extraction"
        },
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        requestId
      },
      logger
    });
    const extractEndTime = Date.now();
    const { data: extractedData, usage: extractUsage } = extractionResponse;
    let extractResponseFile = "";
    if (logInferenceToFile) {
      const { fileName } = writeTimestampedTxtFile(
        "extract_summary",
        "extract_response",
        {
          requestId,
          modelResponse: "extract",
          rawResponse: extractedData
        }
      );
      extractResponseFile = fileName;
      appendSummary("extract", {
        extract_inference_type: "extract",
        timestamp: extractCallTimestamp,
        LLM_input_file: extractCallFile,
        LLM_output_file: extractResponseFile,
        prompt_tokens: (_a = extractUsage == null ? void 0 : extractUsage.prompt_tokens) != null ? _a : 0,
        completion_tokens: (_b = extractUsage == null ? void 0 : extractUsage.completion_tokens) != null ? _b : 0,
        inference_time_ms: extractEndTime - extractStartTime
      });
    }
    const refineCallMessages = [
      buildRefineSystemPrompt(),
      buildRefineUserPrompt(
        instruction,
        previouslyExtractedContent,
        extractedData
      )
    ];
    let refineCallFile = "";
    let refineCallTimestamp = "";
    if (logInferenceToFile) {
      const { fileName, timestamp } = writeTimestampedTxtFile(
        "extract_summary",
        "refine_call",
        {
          requestId,
          modelCall: "refine",
          messages: refineCallMessages
        }
      );
      refineCallFile = fileName;
      refineCallTimestamp = timestamp;
    }
    const refineStartTime = Date.now();
    const refinedResponse = yield llmClient.createChatCompletion({
      options: {
        messages: refineCallMessages,
        response_model: {
          schema,
          name: "RefinedExtraction"
        },
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        requestId
      },
      logger
    });
    const refineEndTime = Date.now();
    const { data: refinedResponseData, usage: refinedResponseUsage } = refinedResponse;
    let refineResponseFile = "";
    if (logInferenceToFile) {
      const { fileName } = writeTimestampedTxtFile(
        "extract_summary",
        "refine_response",
        {
          requestId,
          modelResponse: "refine",
          rawResponse: refinedResponseData
        }
      );
      refineResponseFile = fileName;
      appendSummary("extract", {
        extract_inference_type: "refine",
        timestamp: refineCallTimestamp,
        LLM_input_file: refineCallFile,
        LLM_output_file: refineResponseFile,
        prompt_tokens: (_c = refinedResponseUsage == null ? void 0 : refinedResponseUsage.prompt_tokens) != null ? _c : 0,
        completion_tokens: (_d = refinedResponseUsage == null ? void 0 : refinedResponseUsage.completion_tokens) != null ? _d : 0,
        inference_time_ms: refineEndTime - refineStartTime
      });
    }
    const metadataCallMessages = [
      buildMetadataSystemPrompt(),
      buildMetadataPrompt(
        instruction,
        refinedResponseData,
        chunksSeen,
        chunksTotal
      )
    ];
    let metadataCallFile = "";
    let metadataCallTimestamp = "";
    if (logInferenceToFile) {
      const { fileName, timestamp } = writeTimestampedTxtFile(
        "extract_summary",
        "metadata_call",
        {
          requestId,
          modelCall: "metadata",
          messages: metadataCallMessages
        }
      );
      metadataCallFile = fileName;
      metadataCallTimestamp = timestamp;
    }
    const metadataStartTime = Date.now();
    const metadataResponse = yield llmClient.createChatCompletion({
      options: {
        messages: metadataCallMessages,
        response_model: {
          name: "Metadata",
          schema: metadataSchema
        },
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        requestId
      },
      logger
    });
    const metadataEndTime = Date.now();
    const {
      data: {
        completed: metadataResponseCompleted,
        progress: metadataResponseProgress
      },
      usage: metadataResponseUsage
    } = metadataResponse;
    let metadataResponseFile = "";
    if (logInferenceToFile) {
      const { fileName } = writeTimestampedTxtFile(
        "extract_summary",
        "metadata_response",
        {
          requestId,
          modelResponse: "metadata",
          completed: metadataResponseCompleted,
          progress: metadataResponseProgress
        }
      );
      metadataResponseFile = fileName;
      appendSummary("extract", {
        extract_inference_type: "metadata",
        timestamp: metadataCallTimestamp,
        LLM_input_file: metadataCallFile,
        LLM_output_file: metadataResponseFile,
        prompt_tokens: (_e = metadataResponseUsage == null ? void 0 : metadataResponseUsage.prompt_tokens) != null ? _e : 0,
        completion_tokens: (_f = metadataResponseUsage == null ? void 0 : metadataResponseUsage.completion_tokens) != null ? _f : 0,
        inference_time_ms: metadataEndTime - metadataStartTime
      });
    }
    const totalPromptTokens = ((_g = extractUsage == null ? void 0 : extractUsage.prompt_tokens) != null ? _g : 0) + ((_h = refinedResponseUsage == null ? void 0 : refinedResponseUsage.prompt_tokens) != null ? _h : 0) + ((_i = metadataResponseUsage == null ? void 0 : metadataResponseUsage.prompt_tokens) != null ? _i : 0);
    const totalCompletionTokens = ((_j = extractUsage == null ? void 0 : extractUsage.completion_tokens) != null ? _j : 0) + ((_k = refinedResponseUsage == null ? void 0 : refinedResponseUsage.completion_tokens) != null ? _k : 0) + ((_l = metadataResponseUsage == null ? void 0 : metadataResponseUsage.completion_tokens) != null ? _l : 0);
    const totalInferenceTimeMs = extractEndTime - extractStartTime + (refineEndTime - refineStartTime) + (metadataEndTime - metadataStartTime);
    return __spreadProps(__spreadValues({}, refinedResponseData), {
      metadata: {
        completed: metadataResponseCompleted,
        progress: metadataResponseProgress
      },
      prompt_tokens: totalPromptTokens,
      completion_tokens: totalCompletionTokens,
      inference_time_ms: totalInferenceTimeMs
    });
  });
}
function observe(_0) {
  return __async(this, arguments, function* ({
    instruction,
    domElements,
    llmClient,
    requestId,
    isUsingAccessibilityTree,
    userProvidedInstructions,
    logger,
    returnAction = false,
    logInferenceToFile = false
  }) {
    var _a, _b, _c, _d;
    const observeSchema = import_zod2.z.object({
      elements: import_zod2.z.array(
        import_zod2.z.object(__spreadValues({
          elementId: import_zod2.z.number().describe("the number of the element"),
          description: import_zod2.z.string().describe(
            isUsingAccessibilityTree ? "a description of the accessible element and its purpose" : "a description of the element and what it is relevant for"
          )
        }, returnAction ? {
          method: import_zod2.z.string().describe(
            "the candidate method/action to interact with the element. Select one of the available Playwright interaction methods."
          ),
          arguments: import_zod2.z.array(
            import_zod2.z.string().describe(
              "the arguments to pass to the method. For example, for a click, the arguments are empty, but for a fill, the arguments are the value to fill in."
            )
          )
        } : {}))
      ).describe(
        isUsingAccessibilityTree ? "an array of accessible elements that match the instruction" : "an array of elements that match the instruction"
      )
    });
    const messages = [
      buildObserveSystemPrompt(
        userProvidedInstructions,
        isUsingAccessibilityTree
      ),
      buildObserveUserMessage(instruction, domElements, isUsingAccessibilityTree)
    ];
    let callTimestamp = "";
    let callFile = "";
    if (logInferenceToFile) {
      const { fileName, timestamp } = writeTimestampedTxtFile(
        "observe_summary",
        "observe_call",
        {
          requestId,
          modelCall: "observe",
          messages
        }
      );
      callFile = fileName;
      callTimestamp = timestamp;
    }
    const start = Date.now();
    const rawResponse = yield llmClient.createChatCompletion({
      options: {
        messages,
        response_model: {
          schema: observeSchema,
          name: "Observation"
        },
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        requestId
      },
      logger
    });
    const end = Date.now();
    const usageTimeMs = end - start;
    const { data: observeData, usage: observeUsage } = rawResponse;
    const promptTokens = (_a = observeUsage == null ? void 0 : observeUsage.prompt_tokens) != null ? _a : 0;
    const completionTokens = (_b = observeUsage == null ? void 0 : observeUsage.completion_tokens) != null ? _b : 0;
    let responseFile = "";
    if (logInferenceToFile) {
      const { fileName: responseFileName } = writeTimestampedTxtFile(
        "observe_summary",
        "observe_response",
        {
          requestId,
          modelResponse: "observe",
          rawResponse: observeData
        }
      );
      responseFile = responseFileName;
      appendSummary("observe", {
        observe_inference_type: "observe",
        timestamp: callTimestamp,
        LLM_input_file: callFile,
        LLM_output_file: responseFile,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        inference_time_ms: usageTimeMs
      });
    }
    const parsedElements = (_d = (_c = observeData.elements) == null ? void 0 : _c.map((el) => {
      const base = {
        elementId: Number(el.elementId),
        description: String(el.description)
      };
      if (returnAction) {
        return __spreadProps(__spreadValues({}, base), {
          method: String(el.method),
          arguments: el.arguments
        });
      }
      return base;
    })) != null ? _d : [];
    return {
      elements: parsedElements,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      inference_time_ms: usageTimeMs
    };
  });
}

// lib/utils.ts
var import_crypto = __toESM(require("crypto"));
var HEURISTIC_CHAR_WIDTH = 5;
function generateId(operation) {
  return import_crypto.default.createHash("sha256").update(operation).digest("hex");
}
function formatText(textAnnotations, pageWidth) {
  const sortedAnnotations = [...textAnnotations].sort(
    (a, b) => a.bottom_left.y - b.bottom_left.y
  );
  const epsilon = 1;
  const lineMap = /* @__PURE__ */ new Map();
  for (const annotation of sortedAnnotations) {
    let foundLineY;
    for (const key of lineMap.keys()) {
      if (Math.abs(key - annotation.bottom_left.y) < epsilon) {
        foundLineY = key;
        break;
      }
    }
    if (foundLineY !== void 0) {
      lineMap.get(foundLineY).push(annotation);
    } else {
      lineMap.set(annotation.bottom_left.y, [annotation]);
    }
  }
  const lineYs = Array.from(lineMap.keys()).sort((a, b) => a - b);
  const finalLines = [];
  for (const lineY of lineYs) {
    const lineAnnotations = lineMap.get(lineY);
    lineAnnotations.sort((a, b) => a.bottom_left.x - b.bottom_left.x);
    const groupedLineAnnotations = groupWordsInSentence(lineAnnotations);
    finalLines.push(groupedLineAnnotations);
  }
  let maxLineWidthInChars = 0;
  for (const line of finalLines) {
    let lineMaxEnd = 0;
    for (const ann of line) {
      const startXInChars = Math.round(
        ann.bottom_left_normalized.x * (pageWidth / HEURISTIC_CHAR_WIDTH)
      );
      const endXInChars = startXInChars + ann.text.length;
      if (endXInChars > lineMaxEnd) {
        lineMaxEnd = endXInChars;
      }
    }
    if (lineMaxEnd > maxLineWidthInChars) {
      maxLineWidthInChars = lineMaxEnd;
    }
  }
  maxLineWidthInChars += 20;
  const canvasWidth = Math.max(maxLineWidthInChars, 1);
  const lineBaselines = finalLines.map(
    (line) => Math.min(...line.map((a) => a.bottom_left.y))
  );
  const verticalGaps = [];
  for (let i = 1; i < lineBaselines.length; i++) {
    verticalGaps.push(lineBaselines[i] - lineBaselines[i - 1]);
  }
  const normalLineSpacing = verticalGaps.length > 0 ? median(verticalGaps) : 0;
  let canvas = [];
  let lineIndex = -1;
  for (let i = 0; i < finalLines.length; i++) {
    if (i === 0) {
      lineIndex++;
      ensureLineExists(canvas, lineIndex, canvasWidth);
    } else {
      const gap = lineBaselines[i] - lineBaselines[i - 1];
      let extraLines = 0;
      if (normalLineSpacing > 0 && gap > 1.2 * normalLineSpacing) {
        extraLines = Math.max(Math.round(gap / normalLineSpacing) - 1, 0);
      }
      for (let e = 0; e < extraLines; e++) {
        lineIndex++;
        ensureLineExists(canvas, lineIndex, canvasWidth);
      }
      lineIndex++;
      ensureLineExists(canvas, lineIndex, canvasWidth);
    }
    const lineAnnotations = finalLines[i];
    for (const annotation of lineAnnotations) {
      const text = annotation.text;
      const startXInChars = Math.round(
        annotation.bottom_left_normalized.x * (pageWidth / HEURISTIC_CHAR_WIDTH)
      );
      for (let j = 0; j < text.length; j++) {
        const xPos = startXInChars + j;
        if (xPos < canvasWidth) {
          canvas[lineIndex][xPos] = text[j];
        }
      }
    }
  }
  canvas = canvas.map((row) => {
    const lineStr = row.join("");
    return Array.from(lineStr.trimEnd());
  });
  let pageText = canvas.map((line) => line.join("")).join("\n");
  pageText = pageText.trimEnd();
  pageText = "-".repeat(canvasWidth) + "\n" + pageText + "\n" + "-".repeat(canvasWidth);
  return pageText;
}
function ensureLineExists(canvas, lineIndex, width) {
  while (lineIndex >= canvas.length) {
    canvas.push(new Array(width).fill(" "));
  }
}
function groupWordsInSentence(lineAnnotations) {
  const groupedAnnotations = [];
  let currentGroup = [];
  for (const annotation of lineAnnotations) {
    if (currentGroup.length === 0) {
      currentGroup.push(annotation);
      continue;
    }
    const padding = 1;
    const lastAnn = currentGroup[currentGroup.length - 1];
    const characterWidth = lastAnn.width / lastAnn.text.length * padding;
    const isWithinHorizontalRange = annotation.bottom_left.x <= lastAnn.bottom_left.x + lastAnn.width + characterWidth;
    if (Math.abs(annotation.height - currentGroup[0].height) <= 4 && isWithinHorizontalRange) {
      currentGroup.push(annotation);
    } else {
      if (currentGroup.length > 0) {
        const groupedAnnotation = createGroupedAnnotation(currentGroup);
        if (groupedAnnotation.text.length > 0) {
          groupedAnnotations.push(groupedAnnotation);
          currentGroup = [annotation];
        }
      }
    }
  }
  if (currentGroup.length > 0) {
    const groupedAnnotation = createGroupedAnnotation(currentGroup);
    groupedAnnotations.push(groupedAnnotation);
  }
  return groupedAnnotations;
}
function createGroupedAnnotation(group) {
  let text = "";
  for (const word of group) {
    if ([".", ",", '"', "'", ":", ";", "!", "?", "{", "}", "\u2019", "\u201D"].includes(
      word.text
    )) {
      text += word.text;
    } else {
      text += text !== "" ? " " + word.text : word.text;
    }
  }
  const isWord = /[a-zA-Z0-9]/.test(text);
  const medianHeight = median(group.map((word) => word.height));
  if (isWord && medianHeight > 25) {
    text = "**" + text + "**";
  }
  return {
    text,
    bottom_left: {
      x: group[0].bottom_left.x,
      y: group[0].bottom_left.y
    },
    bottom_left_normalized: {
      x: group[0].bottom_left_normalized.x,
      y: group[0].bottom_left_normalized.y
    },
    width: group.reduce((sum, a) => sum + a.width, 0),
    height: group[0].height
  };
}
function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}
function logLineToString(logLine) {
  var _a;
  try {
    const timestamp = logLine.timestamp || (/* @__PURE__ */ new Date()).toISOString();
    if ((_a = logLine.auxiliary) == null ? void 0 : _a.error) {
      return `${timestamp}::[stagehand:${logLine.category}] ${logLine.message}
 ${logLine.auxiliary.error.value}
 ${logLine.auxiliary.trace.value}`;
    }
    return `${timestamp}::[stagehand:${logLine.category}] ${logLine.message} ${logLine.auxiliary ? JSON.stringify(logLine.auxiliary) : ""}`;
  } catch (error) {
    console.error(`Error logging line:`, error);
    return "error logging line";
  }
}
function validateZodSchema(schema, data) {
  try {
    schema.parse(data);
    return true;
  } catch (e) {
    return false;
  }
}
function drawObserveOverlay(page, results) {
  return __async(this, null, function* () {
    const xpathList = results.map((result) => result.selector);
    const validXpaths = xpathList.filter((xpath) => xpath !== "xpath=");
    yield page.evaluate((selectors) => {
      selectors.forEach((selector) => {
        let element;
        if (selector.startsWith("xpath=")) {
          const xpath = selector.substring(6);
          element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
        } else {
          element = document.querySelector(selector);
        }
        if (element instanceof HTMLElement) {
          const overlay = document.createElement("div");
          overlay.setAttribute("stagehandObserve", "true");
          const rect = element.getBoundingClientRect();
          overlay.style.position = "absolute";
          overlay.style.left = rect.left + "px";
          overlay.style.top = rect.top + "px";
          overlay.style.width = rect.width + "px";
          overlay.style.height = rect.height + "px";
          overlay.style.backgroundColor = "rgba(255, 255, 0, 0.3)";
          overlay.style.pointerEvents = "none";
          overlay.style.zIndex = "10000";
          document.body.appendChild(overlay);
        }
      });
    }, validXpaths);
  });
}
function clearOverlays(page) {
  return __async(this, null, function* () {
    yield page.evaluate(() => {
      const elements = document.querySelectorAll('[stagehandObserve="true"]');
      elements.forEach((el) => {
        const parent = el.parentNode;
        while (el.firstChild) {
          parent == null ? void 0 : parent.insertBefore(el.firstChild, el);
        }
        parent == null ? void 0 : parent.removeChild(el);
      });
    });
  });
}
function isRunningInBun() {
  return typeof process !== "undefined" && typeof process.versions !== "undefined" && "bun" in process.versions;
}

// types/act.ts
var SupportedPlaywrightAction = /* @__PURE__ */ ((SupportedPlaywrightAction2) => {
  SupportedPlaywrightAction2["CLICK"] = "click";
  SupportedPlaywrightAction2["FILL"] = "fill";
  SupportedPlaywrightAction2["TYPE"] = "type";
  SupportedPlaywrightAction2["SCROLL"] = "scrollTo";
  return SupportedPlaywrightAction2;
})(SupportedPlaywrightAction || {});

// lib/dom/utils.ts
function getNodeFromXpath(xpath) {
  return document.evaluate(
    xpath,
    document.documentElement,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

// lib/handlers/handlerUtils/actHandlerUtils.ts
var methodHandlerMap = {
  scrollIntoView: scrollElementIntoView,
  scrollTo: scrollElementToPercentage,
  scroll: scrollElementToPercentage,
  "mouse.wheel": scrollElementToPercentage,
  fill: fillOrType,
  type: fillOrType,
  press: pressKey,
  click: clickElement
};
function scrollElementIntoView(ctx) {
  return __async(this, null, function* () {
    const { locator, xpath, logger } = ctx;
    logger({
      category: "action",
      message: "scrolling element into view",
      level: 2,
      auxiliary: {
        xpath: { value: xpath, type: "string" }
      }
    });
    try {
      yield locator.evaluate((element) => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    } catch (e) {
      logger({
        category: "action",
        message: "error scrolling element into view",
        level: 1,
        auxiliary: {
          error: { value: e.message, type: "string" },
          trace: { value: e.stack, type: "string" },
          xpath: { value: xpath, type: "string" }
        }
      });
      throw new PlaywrightCommandException(e.message);
    }
  });
}
function scrollElementToPercentage(ctx) {
  return __async(this, null, function* () {
    const { args, stagehandPage, xpath, logger } = ctx;
    logger({
      category: "action",
      message: "scrolling element vertically to specified percentage",
      level: 2,
      auxiliary: {
        xpath: { value: xpath, type: "string" },
        coordinate: { value: JSON.stringify(args), type: "string" }
      }
    });
    try {
      const [yArg = "0%"] = args;
      yield stagehandPage.page.evaluate(
        ({ xpath: xpath2, yArg: yArg2 }) => {
          function parsePercent(val) {
            const cleaned = val.trim().replace("%", "");
            const num = parseFloat(cleaned);
            return Number.isNaN(num) ? 0 : Math.max(0, Math.min(num, 100));
          }
          const elementNode = getNodeFromXpath(xpath2);
          if (!elementNode || elementNode.nodeType !== Node.ELEMENT_NODE) {
            console.warn(`Could not locate element to scroll on.`);
            return;
          }
          const element = elementNode;
          const yPct = parsePercent(yArg2);
          if (element.tagName.toLowerCase() === "html") {
            const scrollHeight = document.body.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollTop = (scrollHeight - viewportHeight) * (yPct / 100);
            window.scrollTo({
              top: scrollTop,
              left: window.scrollX,
              behavior: "smooth"
            });
          } else {
            const scrollHeight = element.scrollHeight;
            const clientHeight = element.clientHeight;
            const scrollTop = (scrollHeight - clientHeight) * (yPct / 100);
            element.scrollTo({
              top: scrollTop,
              left: element.scrollLeft,
              behavior: "smooth"
            });
          }
        },
        { xpath, yArg }
      );
    } catch (e) {
      logger({
        category: "action",
        message: "error scrolling element vertically to percentage",
        level: 1,
        auxiliary: {
          error: { value: e.message, type: "string" },
          trace: { value: e.stack, type: "string" },
          xpath: { value: xpath, type: "string" },
          args: { value: JSON.stringify(args), type: "object" }
        }
      });
      throw new PlaywrightCommandException(e.message);
    }
  });
}
function fillOrType(ctx) {
  return __async(this, null, function* () {
    var _a;
    const { locator, xpath, args, logger } = ctx;
    try {
      yield locator.fill("");
      yield locator.click();
      const text = ((_a = args[0]) == null ? void 0 : _a.toString()) || "";
      for (const char of text) {
        yield locator.page().keyboard.type(char, {
          delay: Math.random() * 50 + 25
        });
      }
    } catch (e) {
      logger({
        category: "action",
        message: "error filling element",
        level: 1,
        auxiliary: {
          error: { value: e.message, type: "string" },
          trace: { value: e.stack, type: "string" },
          xpath: { value: xpath, type: "string" }
        }
      });
      throw new PlaywrightCommandException(e.message);
    }
  });
}
function pressKey(ctx) {
  return __async(this, null, function* () {
    var _a, _b, _c, _d;
    const {
      locator,
      xpath,
      args,
      logger,
      stagehandPage,
      initialUrl,
      domSettleTimeoutMs
    } = ctx;
    try {
      const key = (_b = (_a = args[0]) == null ? void 0 : _a.toString()) != null ? _b : "";
      yield locator.page().keyboard.press(key);
      yield handlePossiblePageNavigation(
        "press",
        xpath,
        initialUrl,
        stagehandPage,
        logger,
        domSettleTimeoutMs
      );
    } catch (e) {
      logger({
        category: "action",
        message: "error pressing key",
        level: 1,
        auxiliary: {
          error: { value: e.message, type: "string" },
          trace: { value: e.stack, type: "string" },
          key: { value: (_d = (_c = args[0]) == null ? void 0 : _c.toString()) != null ? _d : "unknown", type: "string" }
        }
      });
      throw new PlaywrightCommandException(e.message);
    }
  });
}
function clickElement(ctx) {
  return __async(this, null, function* () {
    const {
      locator,
      xpath,
      args,
      logger,
      stagehandPage,
      initialUrl,
      domSettleTimeoutMs
    } = ctx;
    logger({
      category: "action",
      message: "page URL before click",
      level: 2,
      auxiliary: {
        url: {
          value: stagehandPage.page.url(),
          type: "string"
        }
      }
    });
    try {
      const isRadio = yield locator.evaluate((el) => {
        return el instanceof HTMLInputElement && el.type === "radio";
      });
      const clickArg = args.length ? args[0] : void 0;
      if (isRadio) {
        const inputId = yield locator.evaluate(
          (el) => el.id
        );
        let labelLocator = null;
        if (inputId) {
          labelLocator = stagehandPage.page.locator(`label[for="${inputId}"]`);
        }
        if (!labelLocator || (yield labelLocator.count()) < 1) {
          labelLocator = stagehandPage.page.locator(`xpath=${xpath}/ancestor::label`).first();
        }
        if ((yield labelLocator.count()) < 1) {
          labelLocator = locator.locator("xpath=following-sibling::label").first();
          if ((yield labelLocator.count()) < 1) {
            labelLocator = locator.locator("xpath=preceding-sibling::label").first();
          }
        }
        if ((yield labelLocator.count()) > 0) {
          yield labelLocator.click(clickArg);
        } else {
          yield locator.click(clickArg);
        }
      } else {
        yield locator.click(clickArg);
      }
    } catch (e) {
      logger({
        category: "action",
        message: "error performing click",
        level: 1,
        auxiliary: {
          error: { value: e.message, type: "string" },
          trace: { value: e.stack, type: "string" },
          xpath: { value: xpath, type: "string" },
          method: { value: "click", type: "string" },
          args: { value: JSON.stringify(args), type: "object" }
        }
      });
      throw new PlaywrightCommandException(e.message);
    }
    yield handlePossiblePageNavigation(
      "click",
      xpath,
      initialUrl,
      stagehandPage,
      logger,
      domSettleTimeoutMs
    );
  });
}
function fallbackLocatorMethod(ctx) {
  return __async(this, null, function* () {
    const { locator, xpath, method, args, logger } = ctx;
    logger({
      category: "action",
      message: "page URL before action",
      level: 2,
      auxiliary: {
        url: { value: locator.page().url(), type: "string" }
      }
    });
    try {
      yield locator[method](...args.map((arg) => (arg == null ? void 0 : arg.toString()) || ""));
    } catch (e) {
      logger({
        category: "action",
        message: "error performing method",
        level: 1,
        auxiliary: {
          error: { value: e.message, type: "string" },
          trace: { value: e.stack, type: "string" },
          xpath: { value: xpath, type: "string" },
          method: { value: method, type: "string" },
          args: { value: JSON.stringify(args), type: "object" }
        }
      });
      throw new PlaywrightCommandException(e.message);
    }
  });
}
function handlePossiblePageNavigation(actionDescription, xpath, initialUrl, stagehandPage, logger, domSettleTimeoutMs) {
  return __async(this, null, function* () {
    logger({
      category: "action",
      message: `${actionDescription}, checking for page navigation`,
      level: 1,
      auxiliary: {
        xpath: { value: xpath, type: "string" }
      }
    });
    const newOpenedTab = yield Promise.race([
      new Promise((resolve) => {
        stagehandPage.context.once("page", (page) => resolve(page));
        setTimeout(() => resolve(null), 1500);
      })
    ]);
    logger({
      category: "action",
      message: `${actionDescription} complete`,
      level: 1,
      auxiliary: {
        newOpenedTab: {
          value: newOpenedTab ? "opened a new tab" : "no new tabs opened",
          type: "string"
        }
      }
    });
    if (newOpenedTab) {
      logger({
        category: "action",
        message: "new page detected (new tab) with URL",
        level: 1,
        auxiliary: {
          url: { value: newOpenedTab.url(), type: "string" }
        }
      });
      yield newOpenedTab.close();
      yield stagehandPage.page.goto(newOpenedTab.url());
      yield stagehandPage.page.waitForLoadState("domcontentloaded");
    }
    try {
      yield stagehandPage._waitForSettledDom(domSettleTimeoutMs);
    } catch (e) {
      logger({
        category: "action",
        message: "wait for settled DOM timeout hit",
        level: 1,
        auxiliary: {
          trace: { value: e.stack, type: "string" },
          message: { value: e.message, type: "string" }
        }
      });
    }
    logger({
      category: "action",
      message: "finished waiting for (possible) page navigation",
      level: 1
    });
    if (stagehandPage.page.url() !== initialUrl) {
      logger({
        category: "action",
        message: "new page detected with URL",
        level: 1,
        auxiliary: {
          url: { value: stagehandPage.page.url(), type: "string" }
        }
      });
    }
  });
}

// lib/handlers/actHandler.ts
var StagehandActHandler = class {
  constructor({
    stagehand,
    verbose,
    llmProvider,
    enableCaching,
    logger,
    stagehandPage,
    userProvidedInstructions,
    selfHeal,
    waitForCaptchaSolves
  }) {
    this.stagehand = stagehand;
    this.verbose = verbose;
    this.llmProvider = llmProvider;
    this.enableCaching = enableCaching;
    this.logger = logger;
    this.actionCache = enableCaching ? new ActionCache(this.logger) : void 0;
    this.actions = {};
    this.stagehandPage = stagehandPage;
    this.userProvidedInstructions = userProvidedInstructions;
    this.selfHeal = selfHeal;
    this.waitForCaptchaSolves = waitForCaptchaSolves;
  }
  /**
   * Perform an immediate Playwright action based on an ObserveResult object
   * that was returned from `page.observe(...)`.
   */
  actFromObserveResult(observe2, domSettleTimeoutMs) {
    return __async(this, null, function* () {
      var _a;
      this.logger({
        category: "action",
        message: "Performing act from an ObserveResult",
        level: 1,
        auxiliary: {
          observeResult: {
            value: JSON.stringify(observe2),
            type: "object"
          }
        }
      });
      const method = observe2.method;
      if (method === "not-supported") {
        this.logger({
          category: "action",
          message: "Cannot execute ObserveResult with unsupported method",
          level: 1,
          auxiliary: {
            error: {
              value: "NotSupportedError: The method requested in this ObserveResult is not supported by Stagehand.",
              type: "string"
            },
            trace: {
              value: `Cannot execute act from ObserveResult with unsupported method: ${method}`,
              type: "string"
            }
          }
        });
        return {
          success: false,
          message: `Unable to perform action: The method '${method}' is not supported in ObserveResult. Please use a supported Playwright locator method.`,
          action: observe2.description || `ObserveResult action (${method})`
        };
      }
      const args = (_a = observe2.arguments) != null ? _a : [];
      const selector = observe2.selector.replace("xpath=", "");
      try {
        yield this._performPlaywrightMethod(
          method,
          args,
          selector,
          domSettleTimeoutMs
        );
        return {
          success: true,
          message: `Action [${method}] performed successfully on selector: ${selector}`,
          action: observe2.description || `ObserveResult action (${method})`
        };
      } catch (err) {
        if (!this.selfHeal || err instanceof PlaywrightCommandMethodNotSupportedException) {
          this.logger({
            category: "action",
            message: "Error performing act from an ObserveResult",
            level: 1,
            auxiliary: {
              error: { value: err.message, type: "string" },
              trace: { value: err.stack, type: "string" }
            }
          });
          return {
            success: false,
            message: `Failed to perform act: ${err.message}`,
            action: observe2.description || `ObserveResult action (${method})`
          };
        }
        this.logger({
          category: "action",
          message: "Error performing act from an ObserveResult. Trying again with regular act method",
          level: 1,
          auxiliary: {
            error: { value: err.message, type: "string" },
            trace: { value: err.stack, type: "string" },
            observeResult: { value: JSON.stringify(observe2), type: "object" }
          }
        });
        try {
          const actCommand = observe2.description.toLowerCase().startsWith(method.toLowerCase()) ? observe2.description : method ? `${method} ${observe2.description}` : observe2.description;
          return yield this.stagehandPage.act({
            action: actCommand,
            slowDomBasedAct: true
          });
        } catch (err2) {
          this.logger({
            category: "action",
            message: "Error performing act from an ObserveResult on fallback",
            level: 1,
            auxiliary: {
              error: { value: err2.message, type: "string" },
              trace: { value: err2.stack, type: "string" }
            }
          });
          return {
            success: false,
            message: `Failed to perform act: ${err2.message}`,
            action: observe2.description || `ObserveResult action (${method})`
          };
        }
      }
    });
  }
  /**
   * Perform an act based on an instruction.
   * This method will observe the page and then perform the act on the first element returned.
   */
  observeAct(actionOrOptions) {
    return __async(this, null, function* () {
      let action;
      const observeOptions = {};
      if (typeof actionOrOptions === "object" && actionOrOptions !== null) {
        if (!("action" in actionOrOptions)) {
          throw new Error(
            "Invalid argument. Action options must have an `action` field."
          );
        }
        if (typeof actionOrOptions.action !== "string" || actionOrOptions.action.length === 0) {
          throw new Error("Invalid argument. No action provided.");
        }
        action = actionOrOptions.action;
        if (actionOrOptions.modelName)
          observeOptions.modelName = actionOrOptions.modelName;
        if (actionOrOptions.modelClientOptions)
          observeOptions.modelClientOptions = actionOrOptions.modelClientOptions;
      } else {
        throw new Error(
          "Invalid argument. Valid arguments are: a string, an ActOptions object with an `action` field not empty, or an ObserveResult with a `selector` and `method` field."
        );
      }
      const instruction = buildActObservePrompt(
        action,
        Object.values(SupportedPlaywrightAction),
        actionOrOptions.variables
      );
      const observeResults = yield this.stagehandPage.observe(__spreadValues({
        instruction
      }, observeOptions));
      if (observeResults.length === 0) {
        return {
          success: false,
          message: `Failed to perform act: No observe results found for action`,
          action
        };
      }
      const element = observeResults[0];
      if (actionOrOptions.variables) {
        Object.keys(actionOrOptions.variables).forEach((key) => {
          element.arguments = element.arguments.map(
            (arg) => arg.replace(key, actionOrOptions.variables[key])
          );
        });
      }
      return this.actFromObserveResult(
        element,
        actionOrOptions.domSettleTimeoutMs
      );
    });
  }
  _recordAction(action, result) {
    return __async(this, null, function* () {
      const id = generateId(action);
      this.actions[id] = { result, action };
      return id;
    });
  }
  _verifyActionCompletion(_0) {
    return __async(this, arguments, function* ({
      completed,
      requestId,
      action,
      steps,
      llmClient,
      domSettleTimeoutMs
    }) {
      if (!completed) {
        return false;
      }
      yield this.stagehandPage._waitForSettledDom(domSettleTimeoutMs);
      let verifyLLmClient = llmClient;
      if (llmClient.modelName.startsWith("o1") || llmClient.modelName.startsWith("o3")) {
        verifyLLmClient = this.llmProvider.getClient(
          "gpt-4o",
          llmClient.clientOptions
        );
      }
      const { outputString: domElements } = yield this.stagehandPage.page.evaluate(() => {
        return window.processAllOfDom();
      });
      let actionCompleted = false;
      if (completed) {
        this.logger({
          category: "action",
          message: "action marked as completed, verifying if this is true...",
          level: 1,
          auxiliary: {
            action: {
              value: action,
              type: "string"
            }
          }
        });
        const verifyResult = yield verifyActCompletion({
          goal: action,
          steps,
          llmProvider: this.llmProvider,
          llmClient: verifyLLmClient,
          domElements,
          logger: this.logger,
          requestId,
          logInferenceToFile: this.stagehand.logInferenceToFile
        });
        actionCompleted = verifyResult.completed;
        this.logger({
          category: "action",
          message: "action completion verification result",
          level: 1,
          auxiliary: {
            action: {
              value: action,
              type: "string"
            },
            result: {
              value: actionCompleted.toString(),
              type: "boolean"
            }
          }
        });
        this.stagehand.updateMetrics(
          "ACT" /* ACT */,
          verifyResult.prompt_tokens,
          verifyResult.completion_tokens,
          verifyResult.inference_time_ms
        );
      }
      return actionCompleted;
    });
  }
  _performPlaywrightMethod(method, args, xpath, domSettleTimeoutMs) {
    return __async(this, null, function* () {
      const locator = this.stagehandPage.page.locator(`xpath=${xpath}`).first();
      const initialUrl = this.stagehandPage.page.url();
      this.logger({
        category: "action",
        message: "performing playwright method",
        level: 2,
        auxiliary: {
          xpath: { value: xpath, type: "string" },
          method: { value: method, type: "string" }
        }
      });
      const context = {
        method,
        locator,
        xpath,
        args,
        logger: this.logger,
        stagehandPage: this.stagehandPage,
        initialUrl,
        domSettleTimeoutMs
      };
      try {
        const methodFn = methodHandlerMap[method];
        if (methodFn) {
          yield methodFn(context);
        } else if (typeof locator[method] === "function") {
          yield fallbackLocatorMethod(context);
        } else {
          this.logger({
            category: "action",
            message: "chosen method is invalid",
            level: 1,
            auxiliary: {
              method: { value: method, type: "string" }
            }
          });
          throw new PlaywrightCommandMethodNotSupportedException(
            `Method ${method} not supported`
          );
        }
        yield this.stagehandPage._waitForSettledDom(domSettleTimeoutMs);
      } catch (e) {
        this.logger({
          category: "action",
          message: "error performing method",
          level: 1,
          auxiliary: {
            error: { value: e.message, type: "string" },
            trace: { value: e.stack, type: "string" },
            method: { value: method, type: "string" },
            xpath: { value: xpath, type: "string" },
            args: { value: JSON.stringify(args), type: "object" }
          }
        });
        throw new PlaywrightCommandException(e.message);
      }
    });
  }
  _getComponentString(locator) {
    return __async(this, null, function* () {
      return yield locator.evaluate((el) => {
        const clone = el.cloneNode(true);
        const attributesToKeep = [
          "type",
          "name",
          "placeholder",
          "aria-label",
          "role",
          "href",
          "title",
          "alt"
        ];
        Array.from(clone.attributes).forEach((attr) => {
          if (!attributesToKeep.includes(attr.name)) {
            clone.removeAttribute(attr.name);
          }
        });
        const outerHtml = clone.outerHTML;
        return outerHtml.trim().replace(/\s+/g, " ");
      });
    });
  }
  handlePossiblePageNavigation(actionDescription, xpath, initialUrl, domSettleTimeoutMs) {
    return __async(this, null, function* () {
      this.logger({
        category: "action",
        message: `${actionDescription}, checking for page navigation`,
        level: 1,
        auxiliary: {
          xpath: {
            value: xpath,
            type: "string"
          }
        }
      });
      const newOpenedTab = yield Promise.race([
        new Promise((resolve) => {
          this.stagehandPage.context.once("page", (page) => resolve(page));
          setTimeout(() => resolve(null), 1500);
        })
      ]);
      this.logger({
        category: "action",
        message: `${actionDescription} complete`,
        level: 1,
        auxiliary: {
          newOpenedTab: {
            value: newOpenedTab ? "opened a new tab" : "no new tabs opened",
            type: "string"
          }
        }
      });
      if (newOpenedTab) {
        this.logger({
          category: "action",
          message: "new page detected (new tab) with URL",
          level: 1,
          auxiliary: {
            url: {
              value: newOpenedTab.url(),
              type: "string"
            }
          }
        });
        yield newOpenedTab.close();
        yield this.stagehandPage.page.goto(newOpenedTab.url());
        yield this.stagehandPage.page.waitForLoadState("domcontentloaded");
      }
      yield this.stagehandPage._waitForSettledDom(domSettleTimeoutMs).catch((e) => {
        this.logger({
          category: "action",
          message: "wait for settled DOM timeout hit",
          level: 1,
          auxiliary: {
            trace: {
              value: e.stack,
              type: "string"
            },
            message: {
              value: e.message,
              type: "string"
            }
          }
        });
      });
      this.logger({
        category: "action",
        message: "finished waiting for (possible) page navigation",
        level: 1
      });
      if (this.stagehandPage.page.url() !== initialUrl) {
        this.logger({
          category: "action",
          message: "new page detected with URL",
          level: 1,
          auxiliary: {
            url: {
              value: this.stagehandPage.page.url(),
              type: "string"
            }
          }
        });
      }
    });
  }
  act(_0) {
    return __async(this, arguments, function* ({
      action,
      steps = "",
      chunksSeen,
      llmClient,
      retries = 0,
      requestId,
      variables,
      previousSelectors,
      skipActionCacheForThisStep = false,
      domSettleTimeoutMs,
      timeoutMs,
      startTime = Date.now()
    }) {
      var _a, _b;
      try {
        yield this.stagehandPage._waitForSettledDom(domSettleTimeoutMs);
        if (timeoutMs && startTime) {
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime > timeoutMs) {
            return {
              success: false,
              message: `Action timed out after ${timeoutMs}ms`,
              action
            };
          }
        }
        this.logger({
          category: "action",
          message: "running / continuing action",
          level: 2,
          auxiliary: {
            action: {
              value: action,
              type: "string"
            },
            pageUrl: {
              value: this.stagehandPage.page.url(),
              type: "string"
            }
          }
        });
        this.logger({
          category: "action",
          message: "processing DOM",
          level: 2
        });
        const { outputString, selectorMap, chunk, chunks } = yield this.stagehandPage.page.evaluate(
          ({ chunksSeen: chunksSeen2 }) => {
            return window.processDom(chunksSeen2);
          },
          { chunksSeen }
        );
        this.logger({
          category: "action",
          message: "looking at chunk",
          level: 1,
          auxiliary: {
            chunk: {
              value: chunk.toString(),
              type: "integer"
            },
            chunks: {
              value: chunks.length.toString(),
              type: "integer"
            },
            chunksSeen: {
              value: chunksSeen.length.toString(),
              type: "integer"
            },
            chunksLeft: {
              value: (chunks.length - chunksSeen.length).toString(),
              type: "integer"
            }
          }
        });
        const response = yield act({
          action,
          domElements: outputString,
          steps,
          llmClient,
          logger: this.logger,
          requestId,
          variables,
          userProvidedInstructions: this.userProvidedInstructions,
          onActMetrics: (promptTokens, completionTokens, inferenceTimeMs) => {
            this.stagehand.updateMetrics(
              "ACT" /* ACT */,
              promptTokens,
              completionTokens,
              inferenceTimeMs
            );
          },
          logInferenceToFile: this.stagehand.logInferenceToFile
        });
        this.logger({
          category: "action",
          message: "received response from LLM",
          level: 1,
          auxiliary: {
            response: {
              value: JSON.stringify(response),
              type: "object"
            }
          }
        });
        if (!response) {
          if (chunksSeen.length + 1 < chunks.length) {
            chunksSeen.push(chunk);
            this.logger({
              category: "action",
              message: "no action found in current chunk",
              level: 1,
              auxiliary: {
                chunksSeen: {
                  value: chunksSeen.length.toString(),
                  type: "integer"
                }
              }
            });
            return this.act({
              action,
              steps: steps + (!steps.endsWith("\n") ? "\n" : "") + "## Step: Scrolled to another section\n",
              chunksSeen,
              llmClient,
              requestId,
              variables,
              previousSelectors,
              skipActionCacheForThisStep,
              domSettleTimeoutMs,
              timeoutMs,
              startTime
            });
          } else {
            if (this.enableCaching) {
              this.llmProvider.cleanRequestCache(requestId);
              (_a = this.actionCache) == null ? void 0 : _a.deleteCacheForRequestId(requestId);
            }
            return {
              success: false,
              message: `Action was not able to be completed.`,
              action
            };
          }
        }
        const elementId = response["element"];
        const xpaths = selectorMap[elementId];
        const method = response["method"];
        const args = response["args"];
        const elementLines = outputString.split("\n");
        const elementText = ((_b = elementLines.find((line) => line.startsWith(`${elementId}:`))) == null ? void 0 : _b.split(":")[1]) || "Element not found";
        this.logger({
          category: "action",
          message: "executing method",
          level: 1,
          auxiliary: {
            method: {
              value: method,
              type: "string"
            },
            elementId: {
              value: elementId.toString(),
              type: "integer"
            },
            xpaths: {
              value: JSON.stringify(xpaths),
              type: "object"
            },
            args: {
              value: JSON.stringify(args),
              type: "object"
            }
          }
        });
        try {
          const initialUrl = this.stagehandPage.page.url();
          let foundXpath = null;
          let locator = null;
          for (const xp of xpaths) {
            const candidate = this.stagehandPage.page.locator(`xpath=${xp}`).first();
            try {
              yield candidate.waitFor({ state: "attached", timeout: 2e3 });
              foundXpath = xp;
              locator = candidate;
              break;
            } catch (e) {
              this.logger({
                category: "action",
                message: "XPath not yet located; moving on",
                level: 1,
                auxiliary: {
                  xpath: {
                    value: xp,
                    type: "string"
                  },
                  error: {
                    value: e.message,
                    type: "string"
                  }
                }
              });
            }
          }
          if (!foundXpath || !locator) {
            throw new Error("None of the provided XPaths could be located.");
          }
          const originalUrl = this.stagehandPage.page.url();
          const componentString = yield this._getComponentString(locator);
          const responseArgs = [...args];
          if (variables) {
            responseArgs.forEach((arg, index) => {
              if (typeof arg === "string") {
                args[index] = fillInVariables(arg, variables);
              }
            });
          }
          yield this._performPlaywrightMethod(
            method,
            args,
            foundXpath,
            domSettleTimeoutMs
          );
          const newStepString = (!steps.endsWith("\n") ? "\n" : "") + `## Step: ${response.step}
  Element: ${elementText}
  Action: ${response.method}
  Reasoning: ${response.why}
`;
          steps += newStepString;
          if (this.enableCaching) {
            this.actionCache.addActionStep({
              action,
              url: originalUrl,
              previousSelectors,
              playwrightCommand: {
                method,
                args: responseArgs.map((arg) => (arg == null ? void 0 : arg.toString()) || "")
              },
              componentString,
              requestId,
              xpaths,
              newStepString,
              completed: response.completed
            }).catch((e) => {
              this.logger({
                category: "action",
                message: "error adding action step to cache",
                level: 1,
                auxiliary: {
                  error: {
                    value: e.message,
                    type: "string"
                  },
                  trace: {
                    value: e.stack,
                    type: "string"
                  }
                }
              });
            });
          }
          if (this.stagehandPage.page.url() !== initialUrl) {
            steps += `  Result (Important): Page URL changed from ${initialUrl} to ${this.stagehandPage.page.url()}

`;
            if (this.waitForCaptchaSolves) {
              try {
                yield this.stagehandPage.waitForCaptchaSolve(1e3);
              } catch (e) {
              }
            }
          }
          const actionCompleted = yield this._verifyActionCompletion({
            completed: response.completed,
            requestId,
            action,
            steps,
            llmClient,
            domSettleTimeoutMs
          }).catch((error) => {
            this.logger({
              category: "action",
              message: "error verifying action completion. Assuming action completed.",
              level: 1,
              auxiliary: {
                error: {
                  value: error.message,
                  type: "string"
                },
                trace: {
                  value: error.stack,
                  type: "string"
                }
              }
            });
            return true;
          });
          if (!actionCompleted) {
            this.logger({
              category: "action",
              message: "continuing to next action step",
              level: 1
            });
            return this.act({
              action,
              steps,
              llmClient,
              chunksSeen,
              requestId,
              variables,
              previousSelectors: [...previousSelectors, foundXpath],
              skipActionCacheForThisStep: false,
              domSettleTimeoutMs,
              timeoutMs,
              startTime
            });
          } else {
            this.logger({
              category: "action",
              message: "action completed successfully",
              level: 1
            });
            yield this._recordAction(action, response.step);
            return {
              success: true,
              message: `Action completed successfully: ${steps}${response.step}`,
              action
            };
          }
        } catch (error) {
          this.logger({
            category: "action",
            message: "error performing action - d",
            level: 1,
            auxiliary: {
              error: {
                value: error.message,
                type: "string"
              },
              trace: {
                value: error.stack,
                type: "string"
              },
              retries: {
                value: retries.toString(),
                type: "integer"
              }
            }
          });
          if (retries < 2) {
            return this.act({
              action,
              steps,
              llmClient,
              retries: retries + 1,
              chunksSeen,
              requestId,
              variables,
              previousSelectors,
              skipActionCacheForThisStep,
              domSettleTimeoutMs,
              timeoutMs,
              startTime
            });
          }
          yield this._recordAction(action, "");
          if (this.enableCaching) {
            this.llmProvider.cleanRequestCache(requestId);
            this.actionCache.deleteCacheForRequestId(requestId);
          }
          return {
            success: false,
            message: "error performing action - a",
            action
          };
        }
      } catch (error) {
        this.logger({
          category: "action",
          message: "error performing action - b",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            trace: {
              value: error.stack,
              type: "string"
            }
          }
        });
        if (this.enableCaching) {
          this.llmProvider.cleanRequestCache(requestId);
          this.actionCache.deleteCacheForRequestId(requestId);
        }
        return {
          success: false,
          message: `Error performing action - C: ${error.message}`,
          action
        };
      }
    });
  }
};

// lib/handlers/extractHandler.ts
var PROXIMITY_THRESHOLD = 15;
var StagehandExtractHandler = class {
  constructor({
    stagehand,
    logger,
    stagehandPage,
    userProvidedInstructions
  }) {
    this.stagehand = stagehand;
    this.logger = logger;
    this.stagehandPage = stagehandPage;
    this.userProvidedInstructions = userProvidedInstructions;
  }
  extract() {
    return __async(this, arguments, function* ({
      instruction,
      schema,
      content = {},
      chunksSeen = [],
      llmClient,
      requestId,
      domSettleTimeoutMs,
      useTextExtract = false,
      selector
    } = {}) {
      const noArgsCalled = !instruction && !schema && !llmClient && !selector;
      if (noArgsCalled) {
        this.logger({
          category: "extraction",
          message: "Extracting the entire page text.",
          level: 1
        });
        return this.extractPageText();
      }
      if (useTextExtract) {
        return this.textExtract({
          instruction,
          schema,
          content,
          llmClient,
          requestId,
          domSettleTimeoutMs,
          selector
        });
      } else {
        return this.domExtract({
          instruction,
          schema,
          content,
          chunksSeen,
          llmClient,
          requestId,
          domSettleTimeoutMs
        });
      }
    });
  }
  extractPageText() {
    return __async(this, null, function* () {
      yield this.stagehandPage._waitForSettledDom();
      const originalDOM = yield this.stagehandPage.page.evaluate(
        () => window.storeDOM(void 0)
      );
      const { selectorMap } = yield this.stagehand.page.evaluate(
        () => window.processAllOfDom(void 0)
      );
      yield this.stagehand.page.evaluate(
        () => window.createTextBoundingBoxes(void 0)
      );
      const containerDims = yield this.getTargetDimensions();
      const allAnnotations = yield this.collectAllAnnotations(
        selectorMap,
        containerDims.width,
        containerDims.height,
        containerDims.offsetLeft,
        containerDims.offsetTop
      );
      const deduplicatedTextAnnotations = this.deduplicateAnnotations(allAnnotations);
      yield this.stagehandPage.page.evaluate(
        (dom) => window.restoreDOM(dom, void 0),
        originalDOM
      );
      const formattedText = formatText(
        deduplicatedTextAnnotations,
        containerDims.width
      );
      const result = { page_text: formattedText };
      return pageTextSchema.parse(result);
    });
  }
  textExtract(_0) {
    return __async(this, arguments, function* ({
      instruction,
      schema,
      content = {},
      llmClient,
      requestId,
      domSettleTimeoutMs,
      selector
    }) {
      var _a;
      this.logger({
        category: "extraction",
        message: "starting extraction",
        level: 1,
        auxiliary: {
          instruction: {
            value: instruction,
            type: "string"
          }
        }
      });
      yield this.stagehandPage._waitForSettledDom(domSettleTimeoutMs);
      const targetXpath = (_a = selector == null ? void 0 : selector.replace(/^xpath=/, "")) != null ? _a : "";
      const originalDOM = yield this.stagehandPage.page.evaluate(
        (xp) => window.storeDOM(xp),
        targetXpath
      );
      const { selectorMap } = yield this.stagehand.page.evaluate(
        (xp) => window.processAllOfDom(xp),
        targetXpath
      );
      this.logger({
        category: "extraction",
        message: `received output from processAllOfDom. selectorMap has ${Object.keys(selectorMap).length} entries`,
        level: 1
      });
      yield this.stagehand.page.evaluate(
        (xp) => window.createTextBoundingBoxes(xp),
        targetXpath
      );
      const {
        width: containerWidth,
        height: containerHeight,
        offsetLeft = 0,
        offsetTop = 0
      } = yield this.getTargetDimensions(targetXpath);
      const allAnnotations = yield this.collectAllAnnotations(
        selectorMap,
        containerWidth,
        containerHeight,
        offsetLeft,
        offsetTop
      );
      const annotationsGroupedByText = /* @__PURE__ */ new Map();
      for (const annotation of allAnnotations) {
        if (!annotationsGroupedByText.has(annotation.text)) {
          annotationsGroupedByText.set(annotation.text, []);
        }
        annotationsGroupedByText.get(annotation.text).push(annotation);
      }
      const deduplicatedTextAnnotations = [];
      for (const [text, annotations] of annotationsGroupedByText.entries()) {
        for (const annotation of annotations) {
          const isDuplicate = deduplicatedTextAnnotations.some(
            (existingAnnotation) => {
              if (existingAnnotation.text !== text) return false;
              const dx = existingAnnotation.bottom_left.x - annotation.bottom_left.x;
              const dy = existingAnnotation.bottom_left.y - annotation.bottom_left.y;
              const distance = Math.hypot(dx, dy);
              return distance < PROXIMITY_THRESHOLD;
            }
          );
          if (!isDuplicate) {
            deduplicatedTextAnnotations.push(annotation);
          }
        }
      }
      yield this.stagehandPage.page.evaluate(
        ({ dom, xp }) => window.restoreDOM(dom, xp),
        { dom: originalDOM, xp: targetXpath }
      );
      const formattedText = formatText(
        deduplicatedTextAnnotations,
        containerWidth
      );
      const extractionResponse = yield extract({
        instruction,
        previouslyExtractedContent: content,
        domElements: formattedText,
        schema,
        chunksSeen: 1,
        chunksTotal: 1,
        llmClient,
        requestId,
        userProvidedInstructions: this.userProvidedInstructions,
        logger: this.logger,
        logInferenceToFile: this.stagehand.logInferenceToFile
      });
      const _b = extractionResponse, {
        metadata: { completed },
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        inference_time_ms: inferenceTimeMs
      } = _b, output = __objRest(_b, [
        "metadata",
        "prompt_tokens",
        "completion_tokens",
        "inference_time_ms"
      ]);
      this.stagehand.updateMetrics(
        "EXTRACT" /* EXTRACT */,
        promptTokens,
        completionTokens,
        inferenceTimeMs
      );
      this.logger({
        category: "extraction",
        message: "received extraction response",
        auxiliary: {
          extraction_response: {
            value: JSON.stringify(extractionResponse),
            type: "object"
          }
        }
      });
      if (completed) {
        this.logger({
          category: "extraction",
          message: "extraction completed successfully",
          level: 1,
          auxiliary: {
            extraction_response: {
              value: JSON.stringify(extractionResponse),
              type: "object"
            }
          }
        });
      } else {
        this.logger({
          category: "extraction",
          message: "extraction incomplete after processing all data",
          level: 1,
          auxiliary: {
            extraction_response: {
              value: JSON.stringify(extractionResponse),
              type: "object"
            }
          }
        });
      }
      return output;
    });
  }
  domExtract(_0) {
    return __async(this, arguments, function* ({
      instruction,
      schema,
      content = {},
      chunksSeen = [],
      llmClient,
      requestId,
      domSettleTimeoutMs
    }) {
      this.logger({
        category: "extraction",
        message: "starting extraction using old approach",
        level: 1,
        auxiliary: {
          instruction: {
            value: instruction,
            type: "string"
          }
        }
      });
      yield this.stagehandPage._waitForSettledDom(domSettleTimeoutMs);
      const { outputString, chunk, chunks } = yield this.stagehand.page.evaluate(
        (chunksSeen2) => window.processDom(chunksSeen2 != null ? chunksSeen2 : []),
        chunksSeen
      );
      this.logger({
        category: "extraction",
        message: "received output from processDom.",
        auxiliary: {
          chunk: {
            value: chunk.toString(),
            type: "integer"
          },
          chunks_left: {
            value: (chunks.length - chunksSeen.length).toString(),
            type: "integer"
          },
          chunks_total: {
            value: chunks.length.toString(),
            type: "integer"
          }
        }
      });
      const extractionResponse = yield extract({
        instruction,
        previouslyExtractedContent: content,
        domElements: outputString,
        schema,
        llmClient,
        chunksSeen: chunksSeen.length,
        chunksTotal: chunks.length,
        requestId,
        isUsingTextExtract: false,
        userProvidedInstructions: this.userProvidedInstructions,
        logger: this.logger,
        logInferenceToFile: this.stagehand.logInferenceToFile
      });
      const _a = extractionResponse, {
        metadata: { completed },
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        inference_time_ms: inferenceTimeMs
      } = _a, output = __objRest(_a, [
        "metadata",
        "prompt_tokens",
        "completion_tokens",
        "inference_time_ms"
      ]);
      this.stagehand.updateMetrics(
        "EXTRACT" /* EXTRACT */,
        promptTokens,
        completionTokens,
        inferenceTimeMs
      );
      this.logger({
        category: "extraction",
        message: "received extraction response",
        auxiliary: {
          extraction_response: {
            value: JSON.stringify(extractionResponse),
            type: "object"
          }
        }
      });
      chunksSeen.push(chunk);
      if (completed || chunksSeen.length === chunks.length) {
        this.logger({
          category: "extraction",
          message: "got response",
          auxiliary: {
            extraction_response: {
              value: JSON.stringify(extractionResponse),
              type: "object"
            }
          }
        });
        return output;
      } else {
        this.logger({
          category: "extraction",
          message: "continuing extraction",
          auxiliary: {
            extraction_response: {
              value: JSON.stringify(extractionResponse),
              type: "object"
            }
          }
        });
        yield this.stagehandPage._waitForSettledDom(domSettleTimeoutMs);
        return this.domExtract({
          instruction,
          schema,
          content: output,
          chunksSeen,
          llmClient,
          domSettleTimeoutMs
        });
      }
    });
  }
  /**
   * Get the width, height, and offsets of either the entire page or a specific element.
   * (Matches your existing getTargetDimensions logic, just adapted to accept a string | undefined.)
   */
  getTargetDimensions(targetXpath) {
    return __async(this, null, function* () {
      if (!targetXpath) {
        const { innerWidth, innerHeight } = yield this.stagehand.page.evaluate(
          () => ({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
          })
        );
        return {
          width: innerWidth,
          height: innerHeight,
          offsetLeft: 0,
          offsetTop: 0
        };
      }
      const { elemWidth, elemHeight, offsetLeft, offsetTop } = yield this.stagehand.page.evaluate((xp) => {
        const el = window.getNodeFromXpath(xp);
        if (!el) {
          return {
            elemWidth: window.innerWidth,
            elemHeight: window.innerHeight,
            offsetLeft: 0,
            offsetTop: 0
          };
        }
        const rect = el.getBoundingClientRect();
        return {
          elemWidth: rect.width,
          elemHeight: rect.height,
          offsetLeft: rect.left,
          offsetTop: rect.top
        };
      }, targetXpath);
      return {
        width: elemWidth,
        height: elemHeight,
        offsetLeft,
        offsetTop
      };
    });
  }
  /**
   * Collects the bounding boxes for each word inside each of the candidate element in selectorMap,
   * adjusting for container offsets, and producing an array of TextAnnotations.
   */
  collectAllAnnotations(selectorMap, containerWidth, containerHeight, offsetLeft, offsetTop) {
    return __async(this, null, function* () {
      const allAnnotations = [];
      for (const xpaths of Object.values(selectorMap)) {
        const xpath = xpaths[0];
        const boundingBoxes = yield this.stagehandPage.page.evaluate(
          (xp) => window.getElementBoundingBoxes(xp),
          xpath
        );
        for (const box of boundingBoxes) {
          const localLeft = box.left - offsetLeft;
          const localTop = box.top - offsetTop;
          const bottom_left = { x: localLeft, y: localTop + box.height };
          const bottom_left_normalized = {
            x: localLeft / containerWidth,
            y: (localTop + box.height) / containerHeight
          };
          if (box.text.trim().length > 0) {
            allAnnotations.push({
              text: box.text,
              bottom_left,
              bottom_left_normalized,
              width: box.width,
              height: box.height
            });
          }
        }
      }
      return allAnnotations;
    });
  }
  /**
   * Deduplicate text annotations by grouping them by text, then removing duplicates
   * within a certain proximity threshold.
   */
  deduplicateAnnotations(annotations) {
    const annotationsGroupedByText = /* @__PURE__ */ new Map();
    const deduplicated = [];
    for (const annotation of annotations) {
      if (!annotationsGroupedByText.has(annotation.text)) {
        annotationsGroupedByText.set(annotation.text, []);
      }
      annotationsGroupedByText.get(annotation.text).push(annotation);
    }
    for (const [text, group] of annotationsGroupedByText.entries()) {
      for (const annotation of group) {
        const isDuplicate = deduplicated.some((existing) => {
          if (existing.text !== text) return false;
          const dx = existing.bottom_left.x - annotation.bottom_left.x;
          const dy = existing.bottom_left.y - annotation.bottom_left.y;
          const distance = Math.hypot(dx, dy);
          return distance < PROXIMITY_THRESHOLD;
        });
        if (!isDuplicate) {
          deduplicated.push(annotation);
        }
      }
    }
    return deduplicated;
  }
};

// lib/a11y/utils.ts
function formatSimplifiedTree(node, level = 0) {
  var _a;
  const indent = "  ".repeat(level);
  let result = `${indent}[${node.nodeId}] ${node.role}${node.name ? `: ${node.name}` : ""}
`;
  if ((_a = node.children) == null ? void 0 : _a.length) {
    result += node.children.map((child) => formatSimplifiedTree(child, level + 1)).join("");
  }
  return result;
}
function cleanStructuralNodes(node, page, logger) {
  return __async(this, null, function* () {
    if (node.nodeId && parseInt(node.nodeId) < 0) {
      return null;
    }
    if (!node.children || node.children.length === 0) {
      return node.role === "generic" || node.role === "none" ? null : node;
    }
    const cleanedChildrenPromises = node.children.map(
      (child) => cleanStructuralNodes(child, page, logger)
    );
    const resolvedChildren = yield Promise.all(cleanedChildrenPromises);
    const cleanedChildren = resolvedChildren.filter(
      (child) => child !== null
    );
    if (node.role === "generic" || node.role === "none") {
      if (cleanedChildren.length === 1) {
        return cleanedChildren[0];
      } else if (cleanedChildren.length === 0) {
        return null;
      }
    }
    if (page && logger && node.backendDOMNodeId !== void 0 && (node.role === "generic" || node.role === "none")) {
      try {
        const { object } = yield page.sendCDP("DOM.resolveNode", {
          backendNodeId: node.backendDOMNodeId
        });
        if (object && object.objectId) {
          try {
            const { result } = yield page.sendCDP("Runtime.callFunctionOn", {
              objectId: object.objectId,
              functionDeclaration: `
              function() {
                return this.tagName ? this.tagName.toLowerCase() : "";
              }
            `,
              returnByValue: true
            });
            if (result == null ? void 0 : result.value) {
              node.role = result.value;
            }
          } catch (tagNameError) {
            logger({
              category: "observation",
              message: `Could not fetch tagName for node ${node.backendDOMNodeId}`,
              level: 2,
              auxiliary: {
                error: {
                  value: tagNameError.message,
                  type: "string"
                }
              }
            });
          }
        }
      } catch (resolveError) {
        logger({
          category: "observation",
          message: `Could not resolve DOM node ID ${node.backendDOMNodeId}`,
          level: 2,
          auxiliary: {
            error: {
              value: resolveError.message,
              type: "string"
            }
          }
        });
      }
    }
    return cleanedChildren.length > 0 ? __spreadProps(__spreadValues({}, node), { children: cleanedChildren }) : node;
  });
}
function buildHierarchicalTree(nodes, page, logger) {
  return __async(this, null, function* () {
    const nodeMap = /* @__PURE__ */ new Map();
    const iframe_list = [];
    nodes.forEach((node) => {
      const nodeIdValue = parseInt(node.nodeId, 10);
      if (nodeIdValue < 0) {
        return;
      }
      const hasChildren = node.childIds && node.childIds.length > 0;
      const hasValidName = node.name && node.name.trim() !== "";
      const isInteractive = node.role !== "none" && node.role !== "generic" && node.role !== "InlineTextBox";
      if (!hasValidName && !hasChildren && !isInteractive) {
        return;
      }
      nodeMap.set(node.nodeId, __spreadValues(__spreadValues(__spreadValues(__spreadValues({
        role: node.role,
        nodeId: node.nodeId
      }, hasValidName && { name: node.name }), node.description && { description: node.description }), node.value && { value: node.value }), node.backendDOMNodeId !== void 0 && {
        backendDOMNodeId: node.backendDOMNodeId
      }));
    });
    nodes.forEach((node) => {
      const isIframe = node.role === "Iframe";
      if (isIframe) {
        const iframeNode = {
          role: node.role,
          nodeId: node.nodeId
        };
        iframe_list.push(iframeNode);
      }
      if (node.parentId && nodeMap.has(node.nodeId)) {
        const parentNode = nodeMap.get(node.parentId);
        const currentNode = nodeMap.get(node.nodeId);
        if (parentNode && currentNode) {
          if (!parentNode.children) {
            parentNode.children = [];
          }
          parentNode.children.push(currentNode);
        }
      }
    });
    const rootNodes = nodes.filter((node) => !node.parentId && nodeMap.has(node.nodeId)).map((node) => nodeMap.get(node.nodeId)).filter(Boolean);
    const cleanedTreePromises = rootNodes.map(
      (node) => cleanStructuralNodes(node, page, logger)
    );
    const finalTree = (yield Promise.all(cleanedTreePromises)).filter(
      Boolean
    );
    const simplifiedFormat = finalTree.map((node) => formatSimplifiedTree(node)).join("\n");
    return {
      tree: finalTree,
      simplified: simplifiedFormat,
      iframes: iframe_list
    };
  });
}
function getAccessibilityTree(page, logger) {
  return __async(this, null, function* () {
    yield page.enableCDP("Accessibility");
    try {
      const scrollableBackendIds = yield findScrollableElementIds(page);
      const { nodes } = yield page.sendCDP(
        "Accessibility.getFullAXTree"
      );
      const startTime = Date.now();
      const hierarchicalTree = yield buildHierarchicalTree(
        nodes.map((node) => {
          var _a, _b, _c, _d;
          let roleValue = ((_a = node.role) == null ? void 0 : _a.value) || "";
          if (scrollableBackendIds.has(node.backendDOMNodeId)) {
            if (roleValue === "generic" || roleValue === "none") {
              roleValue = "scrollable";
            } else {
              roleValue = roleValue ? `scrollable, ${roleValue}` : "scrollable";
            }
          }
          return {
            role: roleValue,
            name: (_b = node.name) == null ? void 0 : _b.value,
            description: (_c = node.description) == null ? void 0 : _c.value,
            value: (_d = node.value) == null ? void 0 : _d.value,
            nodeId: node.nodeId,
            backendDOMNodeId: node.backendDOMNodeId,
            parentId: node.parentId,
            childIds: node.childIds
          };
        }),
        page,
        logger
      );
      logger({
        category: "observation",
        message: `got accessibility tree in ${Date.now() - startTime}ms`,
        level: 1
      });
      return hierarchicalTree;
    } catch (error) {
      logger({
        category: "observation",
        message: "Error getting accessibility tree",
        level: 1,
        auxiliary: {
          error: {
            value: error.message,
            type: "string"
          },
          trace: {
            value: error.stack,
            type: "string"
          }
        }
      });
      throw error;
    } finally {
      yield page.disableCDP("Accessibility");
    }
  });
}
var functionString = `
function getNodePath(el) {
  if (!el || (el.nodeType !== Node.ELEMENT_NODE && el.nodeType !== Node.TEXT_NODE)) {
    console.log("el is not a valid node type");
    return "";
  }

  const parts = [];
  let current = el;

  while (current && (current.nodeType === Node.ELEMENT_NODE || current.nodeType === Node.TEXT_NODE)) {
    let index = 0;
    let hasSameTypeSiblings = false;
    const siblings = current.parentElement
      ? Array.from(current.parentElement.childNodes)
      : [];

    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      if (
        sibling.nodeType === current.nodeType &&
        sibling.nodeName === current.nodeName
      ) {
        index = index + 1;
        hasSameTypeSiblings = true;
        if (sibling.isSameNode(current)) {
          break;
        }
      }
    }

    if (!current || !current.parentNode) break;
    if (current.nodeName.toLowerCase() === "html"){
      parts.unshift("html");
      break;
    }

    // text nodes are handled differently in XPath
    if (current.nodeName !== "#text") {
      const tagName = current.nodeName.toLowerCase();
      const pathIndex = hasSameTypeSiblings ? \`[\${index}]\` : "";
      parts.unshift(\`\${tagName}\${pathIndex}\`);
    }
    
    current = current.parentElement;
  }

  return parts.length ? \`/\${parts.join("/")}\` : "";
}`;
function getXPathByResolvedObjectId(cdpClient, resolvedObjectId) {
  return __async(this, null, function* () {
    const { result } = yield cdpClient.send("Runtime.callFunctionOn", {
      objectId: resolvedObjectId,
      functionDeclaration: `function() {
      ${functionString}
      return getNodePath(this);
    }`,
      returnByValue: true
    });
    return result.value || "";
  });
}
function findScrollableElementIds(stagehandPage) {
  return __async(this, null, function* () {
    const xpaths = yield stagehandPage.page.evaluate(() => {
      return window.getScrollableElementXpaths();
    });
    const scrollableBackendIds = /* @__PURE__ */ new Set();
    for (const xpath of xpaths) {
      if (!xpath) continue;
      const { result } = yield stagehandPage.sendCDP("Runtime.evaluate", {
        expression: `
        (function() {
          const res = document.evaluate(${JSON.stringify(
          xpath
        )}, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          return res.singleNodeValue;
        })();
      `,
        returnByValue: false
      });
      if (result == null ? void 0 : result.objectId) {
        const { node } = yield stagehandPage.sendCDP("DOM.describeNode", {
          objectId: result.objectId
        });
        if (node == null ? void 0 : node.backendNodeId) {
          scrollableBackendIds.add(node.backendNodeId);
        }
      }
    }
    return scrollableBackendIds;
  });
}

// lib/handlers/observeHandler.ts
var StagehandObserveHandler = class {
  constructor({
    stagehand,
    logger,
    stagehandPage,
    userProvidedInstructions
  }) {
    this.stagehand = stagehand;
    this.logger = logger;
    this.stagehandPage = stagehandPage;
    this.userProvidedInstructions = userProvidedInstructions;
    this.observations = {};
  }
  _recordObservation(instruction, result) {
    return __async(this, null, function* () {
      const id = generateId(instruction);
      this.observations[id] = { result, instruction };
      return id;
    });
  }
  observe(_0) {
    return __async(this, arguments, function* ({
      instruction,
      llmClient,
      requestId,
      returnAction,
      onlyVisible,
      drawOverlay
    }) {
      if (!instruction) {
        instruction = `Find elements that can be used for any future actions in the page. These may be navigation links, related pages, section/subsection links, buttons, or other interactive elements. Be comprehensive: if there are multiple elements that may be relevant for future actions, return all of them.`;
      }
      this.logger({
        category: "observation",
        message: "starting observation",
        level: 1,
        auxiliary: {
          instruction: {
            value: instruction,
            type: "string"
          }
        }
      });
      let selectorMap = {};
      let outputString;
      let iframes = [];
      const useAccessibilityTree = !onlyVisible;
      if (useAccessibilityTree) {
        yield this.stagehandPage._waitForSettledDom();
        const tree = yield getAccessibilityTree(this.stagehandPage, this.logger);
        this.logger({
          category: "observation",
          message: "Getting accessibility tree data",
          level: 1
        });
        outputString = tree.simplified;
        iframes = tree.iframes;
      } else {
        const evalResult = yield this.stagehand.page.evaluate(() => {
          return window.processAllOfDom().then((result) => result);
        });
        ({ outputString, selectorMap } = evalResult);
      }
      const observationResponse = yield observe({
        instruction,
        domElements: outputString,
        llmClient,
        requestId,
        userProvidedInstructions: this.userProvidedInstructions,
        logger: this.logger,
        isUsingAccessibilityTree: useAccessibilityTree,
        returnAction,
        logInferenceToFile: this.stagehand.logInferenceToFile
      });
      const {
        prompt_tokens = 0,
        completion_tokens = 0,
        inference_time_ms = 0
      } = observationResponse;
      this.stagehand.updateMetrics(
        "OBSERVE" /* OBSERVE */,
        prompt_tokens,
        completion_tokens,
        inference_time_ms
      );
      if (iframes.length > 0) {
        iframes.forEach((iframe) => {
          observationResponse.elements.push({
            elementId: Number(iframe.nodeId),
            description: "an iframe",
            method: "not-supported",
            arguments: []
          });
        });
      }
      const elementsWithSelectors = yield Promise.all(
        observationResponse.elements.map((element) => __async(this, null, function* () {
          const _a = element, { elementId } = _a, rest = __objRest(_a, ["elementId"]);
          if (useAccessibilityTree) {
            this.logger({
              category: "observation",
              message: "Getting xpath for element",
              level: 1,
              auxiliary: {
                elementId: {
                  value: elementId.toString(),
                  type: "string"
                }
              }
            });
            const args = { backendNodeId: elementId };
            const { object } = yield this.stagehandPage.sendCDP("DOM.resolveNode", args);
            if (!object || !object.objectId) {
              this.logger({
                category: "observation",
                message: `Invalid object ID returned for element: ${elementId}`,
                level: 1
              });
            }
            const xpath = yield getXPathByResolvedObjectId(
              yield this.stagehandPage.getCDPClient(),
              object.objectId
            );
            if (!xpath || xpath === "") {
              this.logger({
                category: "observation",
                message: `Empty xpath returned for element: ${elementId}`,
                level: 1
              });
            }
            return __spreadProps(__spreadValues({}, rest), {
              selector: `xpath=${xpath}`
              // Provisioning or future use if we want to use direct CDP
              // backendNodeId: elementId,
            });
          }
          return __spreadProps(__spreadValues({}, rest), {
            selector: `xpath=${selectorMap[elementId][0]}`
            // backendNodeId: backendNodeIdMap[elementId],
          });
        }))
      );
      this.logger({
        category: "observation",
        message: "found elements",
        level: 1,
        auxiliary: {
          elements: {
            value: JSON.stringify(elementsWithSelectors),
            type: "object"
          }
        }
      });
      if (drawOverlay) {
        yield drawObserveOverlay(this.stagehandPage.page, elementsWithSelectors);
      }
      yield this._recordObservation(instruction, elementsWithSelectors);
      return elementsWithSelectors;
    });
  }
};

// lib/StagehandPage.ts
var BROWSERBASE_REGION_DOMAIN = {
  "us-west-2": "wss://connect.usw2.browserbase.com",
  "us-east-1": "wss://connect.use1.browserbase.com",
  "eu-central-1": "wss://connect.euc1.browserbase.com",
  "ap-southeast-1": "wss://connect.apse1.browserbase.com"
};
var StagehandPage = class _StagehandPage {
  constructor(page, stagehand, context, llmClient, userProvidedInstructions, api, waitForCaptchaSolves) {
    this.cdpClient = null;
    this.initialized = false;
    this.intPage = new Proxy(page, {
      get: (target, prop) => {
        if (!this.initialized && (prop === "act" || prop === "extract" || prop === "observe" || prop === "on")) {
          return () => {
            throw new Error(
              `You seem to be calling \`${String(prop)}\` on a page in an uninitialized \`Stagehand\` object. Ensure you are running \`await stagehand.init()\` on the Stagehand object before referencing the \`page\` object.`
            );
          };
        }
        const value = target[prop];
        if (typeof value === "function" && prop !== "on") {
          return (...args) => {
            this.intContext.setActivePage(this);
            return value.apply(target, args);
          };
        }
        return value;
      }
    });
    this.stagehand = stagehand;
    this.intContext = context;
    this.llmClient = llmClient;
    this.api = api;
    this.userProvidedInstructions = userProvidedInstructions;
    this.waitForCaptchaSolves = waitForCaptchaSolves != null ? waitForCaptchaSolves : false;
    if (this.llmClient) {
      this.actHandler = new StagehandActHandler({
        stagehand: this.stagehand,
        verbose: this.stagehand.verbose,
        llmProvider: this.stagehand.llmProvider,
        enableCaching: this.stagehand.enableCaching,
        logger: this.stagehand.logger,
        stagehandPage: this,
        stagehandContext: this.intContext,
        llmClient,
        userProvidedInstructions,
        selfHeal: this.stagehand.selfHeal,
        waitForCaptchaSolves: this.waitForCaptchaSolves
      });
      this.extractHandler = new StagehandExtractHandler({
        stagehand: this.stagehand,
        logger: this.stagehand.logger,
        stagehandPage: this,
        userProvidedInstructions
      });
      this.observeHandler = new StagehandObserveHandler({
        stagehand: this.stagehand,
        logger: this.stagehand.logger,
        stagehandPage: this,
        userProvidedInstructions
      });
    }
  }
  _refreshPageFromAPI() {
    return __async(this, null, function* () {
      if (!this.api) return;
      const sessionId = this.stagehand.browserbaseSessionID;
      if (!sessionId) {
        throw new Error("No Browserbase session ID found");
      }
      const browserbase = new import_sdk.Browserbase({
        apiKey: process.env.BROWSERBASE_API_KEY
      });
      const sessionStatus = yield browserbase.sessions.retrieve(sessionId);
      const browserbaseDomain = BROWSERBASE_REGION_DOMAIN[sessionStatus.region] || "wss://connect.browserbase.com";
      const connectUrl = `${browserbaseDomain}?apiKey=${process.env.BROWSERBASE_API_KEY}&sessionId=${sessionId}`;
      const browser = yield import_test.chromium.connectOverCDP(connectUrl);
      const context = browser.contexts()[0];
      const newPage = context.pages()[0];
      const newStagehandPage = yield new _StagehandPage(
        newPage,
        this.stagehand,
        this.intContext,
        this.llmClient,
        this.userProvidedInstructions,
        this.api
      ).init();
      this.intPage = newStagehandPage.page;
      if (this.stagehand.debugDom) {
        this.stagehand.log({
          category: "deprecation",
          message: "Warning: debugDom is not supported in this version of Stagehand",
          level: 1
        });
      }
      yield this.intPage.waitForLoadState("domcontentloaded");
      yield this._waitForSettledDom();
    });
  }
  /**
   * Waits for a captcha to be solved when using Browserbase environment.
   *
   * @param timeoutMs - Optional timeout in milliseconds. If provided, the promise will reject if the captcha solving hasn't started within the given time.
   * @throws Error if called in a LOCAL environment
   * @throws Error if the timeout is reached before captcha solving starts
   * @returns Promise that resolves when the captcha is solved
   */
  waitForCaptchaSolve(timeoutMs) {
    return __async(this, null, function* () {
      if (this.stagehand.env === "LOCAL") {
        throw new Error(
          "The waitForCaptcha method may only be used when using the Browserbase environment."
        );
      }
      this.stagehand.log({
        category: "captcha",
        message: "Waiting for captcha",
        level: 1
      });
      return new Promise((resolve, reject) => {
        let started = false;
        let timeoutId;
        if (timeoutMs) {
          timeoutId = setTimeout(() => {
            if (!started) {
              reject(new Error("Captcha timeout"));
            }
          }, timeoutMs);
        }
        this.intPage.on("console", (msg) => {
          if (msg.text() === "browserbase-solving-finished") {
            this.stagehand.log({
              category: "captcha",
              message: "Captcha solving finished",
              level: 1
            });
            if (timeoutId) clearTimeout(timeoutId);
            resolve();
          } else if (msg.text() === "browserbase-solving-started") {
            started = true;
            this.stagehand.log({
              category: "captcha",
              message: "Captcha solving started",
              level: 1
            });
          }
        });
      });
    });
  }
  init() {
    return __async(this, null, function* () {
      const page = this.intPage;
      const stagehand = this.stagehand;
      const handler = {
        get: (target, prop) => {
          const value = target[prop];
          if (prop === "act" || prop === "extract" || prop === "observe") {
            if (!this.llmClient) {
              return () => {
                throw new Error(
                  "No LLM API key or LLM Client configured. An LLM API key or a custom LLM Client is required to use act, extract, or observe."
                );
              };
            }
            const method = this[prop];
            return (options) => __async(this, null, function* () {
              this.intContext.setActivePage(this);
              return method.call(this, options);
            });
          }
          if (prop === "screenshot") {
            return (..._0) => __async(this, [..._0], function* (options = {}) {
              const cdpOptions = {
                format: options.type === "jpeg" ? "jpeg" : "png",
                quality: options.quality,
                clip: options.clip,
                omitBackground: options.omitBackground,
                fromSurface: true
              };
              if (options.fullPage) {
                cdpOptions.captureBeyondViewport = true;
              }
              const data = yield this.sendCDP(
                "Page.captureScreenshot",
                cdpOptions
              );
              const buffer = Buffer.from(data.data, "base64");
              return buffer;
            });
          }
          if (prop === "goto") {
            return (url, options) => __async(this, null, function* () {
              this.intContext.setActivePage(this);
              const result = this.api ? yield this.api.goto(url, options) : yield target.goto(url, options);
              if (this.waitForCaptchaSolves) {
                try {
                  yield this.waitForCaptchaSolve(1e3);
                } catch (e) {
                }
              }
              if (this.api) {
                yield this._refreshPageFromAPI();
              } else {
                if (stagehand.debugDom) {
                  this.stagehand.log({
                    category: "deprecation",
                    message: "Warning: debugDom is not supported in this version of Stagehand",
                    level: 1
                  });
                }
                yield target.waitForLoadState("domcontentloaded");
                yield this._waitForSettledDom();
              }
              return result;
            });
          }
          if (prop === "on") {
            return (event, listener) => {
              if (event === "popup") {
                return this.context.on("page", (page2) => __async(this, null, function* () {
                  const newContext = yield StagehandContext.init(
                    page2.context(),
                    stagehand
                  );
                  const newStagehandPage = new _StagehandPage(
                    page2,
                    stagehand,
                    newContext,
                    this.llmClient
                  );
                  yield newStagehandPage.init();
                  listener(newStagehandPage.page);
                }));
              }
              this.intContext.setActivePage(this);
              return target.on(event, listener);
            };
          }
          if (typeof value === "function") {
            return (...args) => {
              this.intContext.setActivePage(this);
              return value.apply(target, args);
            };
          }
          return value;
        }
      };
      this.intPage = new Proxy(page, handler);
      this.initialized = true;
      return this;
    });
  }
  get page() {
    return this.intPage;
  }
  get context() {
    return this.intContext.context;
  }
  // We can make methods public because StagehandPage is private to the Stagehand class.
  // When a user gets stagehand.page, they are getting a proxy to the Playwright page.
  // We can override the methods on the proxy to add our own behavior
  _waitForSettledDom(timeoutMs) {
    return __async(this, null, function* () {
      try {
        const timeout = timeoutMs != null ? timeoutMs : this.stagehand.domSettleTimeoutMs;
        let timeoutHandle;
        yield this.page.waitForLoadState("domcontentloaded");
        const timeoutPromise = new Promise((resolve) => {
          timeoutHandle = setTimeout(() => {
            this.stagehand.log({
              category: "dom",
              message: "DOM settle timeout exceeded, continuing anyway",
              level: 1,
              auxiliary: {
                timeout_ms: {
                  value: timeout.toString(),
                  type: "integer"
                }
              }
            });
            resolve();
          }, timeout);
        });
        try {
          yield Promise.race([
            this.page.evaluate(() => {
              return new Promise((resolve) => {
                if (typeof window.waitForDomSettle === "function") {
                  window.waitForDomSettle().then(resolve);
                } else {
                  console.warn(
                    "waitForDomSettle is not defined, considering DOM as settled"
                  );
                  resolve();
                }
              });
            }),
            this.page.waitForLoadState("domcontentloaded"),
            this.page.waitForSelector("body"),
            timeoutPromise
          ]);
        } finally {
          clearTimeout(timeoutHandle);
        }
      } catch (e) {
        this.stagehand.log({
          category: "dom",
          message: "Error in waitForSettledDom",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            }
          }
        });
      }
    });
  }
  act(actionOrOptions) {
    return __async(this, null, function* () {
      if (!this.actHandler) {
        throw new Error("Act handler not initialized");
      }
      yield clearOverlays(this.page);
      if (typeof actionOrOptions === "object" && actionOrOptions !== null) {
        if ("selector" in actionOrOptions && "method" in actionOrOptions) {
          const observeResult = actionOrOptions;
          return this.actHandler.actFromObserveResult(observeResult);
        } else {
          if (!("action" in actionOrOptions)) {
            throw new Error(
              "Invalid argument. Valid arguments are: a string, an ActOptions object, or an ObserveResult WITH 'selector' and 'method' fields."
            );
          }
        }
      } else if (typeof actionOrOptions === "string") {
        actionOrOptions = { action: actionOrOptions };
      } else {
        throw new Error(
          "Invalid argument: you may have called act with an empty ObserveResult.\nValid arguments are: a string, an ActOptions object, or an ObserveResult WITH 'selector' and 'method' fields."
        );
      }
      const {
        action,
        modelName,
        modelClientOptions,
        useVision,
        // still destructure this but will not pass it on
        variables = {},
        domSettleTimeoutMs,
        slowDomBasedAct = true,
        timeoutMs = this.stagehand.actTimeoutMs
      } = actionOrOptions;
      if (typeof useVision !== "undefined") {
        this.stagehand.log({
          category: "deprecation",
          message: "Warning: vision is not supported in this version of Stagehand",
          level: 1
        });
      }
      if (this.api) {
        const result = yield this.api.act(actionOrOptions);
        yield this._refreshPageFromAPI();
        return result;
      }
      const requestId = Math.random().toString(36).substring(2);
      const llmClient = modelName ? this.stagehand.llmProvider.getClient(modelName, modelClientOptions) : this.llmClient;
      if (!slowDomBasedAct) {
        return this.actHandler.observeAct(actionOrOptions);
      }
      this.stagehand.log({
        category: "act",
        message: "running act",
        level: 1,
        auxiliary: {
          action: {
            value: action,
            type: "string"
          },
          requestId: {
            value: requestId,
            type: "string"
          },
          modelName: {
            value: llmClient.modelName,
            type: "string"
          }
        }
      });
      return this.actHandler.act({
        action,
        llmClient,
        chunksSeen: [],
        requestId,
        variables,
        previousSelectors: [],
        skipActionCacheForThisStep: false,
        domSettleTimeoutMs,
        timeoutMs
      }).catch((e) => {
        this.stagehand.log({
          category: "act",
          message: "error acting",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            }
          }
        });
        return {
          success: false,
          message: `Internal error: Error acting: ${e.message}`,
          action
        };
      });
    });
  }
  extract(instructionOrOptions) {
    return __async(this, null, function* () {
      if (!this.extractHandler) {
        throw new Error("Extract handler not initialized");
      }
      yield clearOverlays(this.page);
      if (!instructionOrOptions) {
        if (this.api) {
          return this.api.extract({});
        }
        return this.extractHandler.extract();
      }
      const options = typeof instructionOrOptions === "string" ? {
        instruction: instructionOrOptions,
        schema: defaultExtractSchema
      } : instructionOrOptions;
      const {
        instruction,
        schema,
        modelName,
        modelClientOptions,
        domSettleTimeoutMs,
        useTextExtract,
        selector
      } = options;
      if (selector && useTextExtract !== true) {
        throw new Error(
          "NotImplementedError: Passing an xpath into extract is only supported when `useTextExtract: true`."
        );
      }
      if (this.api) {
        return this.api.extract(options);
      }
      const requestId = Math.random().toString(36).substring(2);
      const llmClient = modelName ? this.stagehand.llmProvider.getClient(modelName, modelClientOptions) : this.llmClient;
      this.stagehand.log({
        category: "extract",
        message: "running extract",
        level: 1,
        auxiliary: {
          instruction: {
            value: instruction,
            type: "string"
          },
          requestId: {
            value: requestId,
            type: "string"
          },
          modelName: {
            value: llmClient.modelName,
            type: "string"
          }
        }
      });
      return this.extractHandler.extract({
        instruction,
        schema,
        llmClient,
        requestId,
        domSettleTimeoutMs,
        useTextExtract,
        selector
      }).catch((e) => {
        this.stagehand.log({
          category: "extract",
          message: "error extracting",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            }
          }
        });
        if (this.stagehand.enableCaching) {
          this.stagehand.llmProvider.cleanRequestCache(requestId);
        }
        throw e;
      });
    });
  }
  observe(instructionOrOptions) {
    return __async(this, null, function* () {
      if (!this.observeHandler) {
        throw new Error("Observe handler not initialized");
      }
      yield clearOverlays(this.page);
      const options = typeof instructionOrOptions === "string" ? { instruction: instructionOrOptions } : instructionOrOptions || {};
      const {
        instruction,
        modelName,
        modelClientOptions,
        useVision,
        // still destructure but will not pass it on
        domSettleTimeoutMs,
        returnAction = true,
        onlyVisible = false,
        useAccessibilityTree,
        drawOverlay
      } = options;
      if (useAccessibilityTree !== void 0) {
        this.stagehand.log({
          category: "deprecation",
          message: "useAccessibilityTree is deprecated.\n  To use accessibility tree as context:\n    1. Set onlyVisible to false (default)\n    2. Don't declare useAccessibilityTree",
          level: 1
        });
        throw new Error(
          "useAccessibilityTree is deprecated. Use onlyVisible instead."
        );
      }
      if (typeof useVision !== "undefined") {
        this.stagehand.log({
          category: "deprecation",
          message: "Warning: vision is not supported in this version of Stagehand",
          level: 1
        });
      }
      if (this.api) {
        return this.api.observe(options);
      }
      const requestId = Math.random().toString(36).substring(2);
      const llmClient = modelName ? this.stagehand.llmProvider.getClient(modelName, modelClientOptions) : this.llmClient;
      this.stagehand.log({
        category: "observe",
        message: "running observe",
        level: 1,
        auxiliary: {
          instruction: {
            value: instruction,
            type: "string"
          },
          requestId: {
            value: requestId,
            type: "string"
          },
          modelName: {
            value: llmClient.modelName,
            type: "string"
          },
          onlyVisible: {
            value: onlyVisible ? "true" : "false",
            type: "boolean"
          }
        }
      });
      return this.observeHandler.observe({
        instruction,
        llmClient,
        requestId,
        domSettleTimeoutMs,
        returnAction,
        onlyVisible,
        drawOverlay
      }).catch((e) => {
        this.stagehand.log({
          category: "observe",
          message: "error observing",
          level: 1,
          auxiliary: {
            error: {
              value: e.message,
              type: "string"
            },
            trace: {
              value: e.stack,
              type: "string"
            },
            requestId: {
              value: requestId,
              type: "string"
            },
            instruction: {
              value: instruction,
              type: "string"
            }
          }
        });
        if (this.stagehand.enableCaching) {
          this.stagehand.llmProvider.cleanRequestCache(requestId);
        }
        throw e;
      });
    });
  }
  getCDPClient() {
    return __async(this, null, function* () {
      if (!this.cdpClient) {
        this.cdpClient = yield this.context.newCDPSession(this.page);
      }
      return this.cdpClient;
    });
  }
  sendCDP(command, args) {
    return __async(this, null, function* () {
      const client = yield this.getCDPClient();
      return client.send(
        command,
        args || {}
      );
    });
  }
  enableCDP(domain) {
    return __async(this, null, function* () {
      yield this.sendCDP(`${domain}.enable`, {});
    });
  }
  disableCDP(domain) {
    return __async(this, null, function* () {
      yield this.sendCDP(`${domain}.disable`, {});
    });
  }
};

// lib/StagehandContext.ts
var StagehandContext = class _StagehandContext {
  constructor(context, stagehand) {
    this.activeStagehandPage = null;
    this.stagehand = stagehand;
    this.pageMap = /* @__PURE__ */ new WeakMap();
    this.intContext = new Proxy(context, {
      get: (target, prop) => {
        if (prop === "newPage") {
          return () => __async(this, null, function* () {
            const pwPage = yield target.newPage();
            const stagehandPage = yield this.createStagehandPage(pwPage);
            this.setActivePage(stagehandPage);
            return stagehandPage.page;
          });
        }
        if (prop === "pages") {
          return () => {
            const pwPages = target.pages();
            return pwPages.map((pwPage) => {
              let stagehandPage = this.pageMap.get(pwPage);
              if (!stagehandPage) {
                stagehandPage = new StagehandPage(
                  pwPage,
                  this.stagehand,
                  this,
                  this.stagehand.llmClient,
                  this.stagehand.userProvidedInstructions,
                  this.stagehand.apiClient,
                  this.stagehand.waitForCaptchaSolves
                );
                this.pageMap.set(pwPage, stagehandPage);
              }
              return stagehandPage.page;
            });
          };
        }
        return target[prop];
      }
    });
  }
  createStagehandPage(page) {
    return __async(this, null, function* () {
      const stagehandPage = yield new StagehandPage(
        page,
        this.stagehand,
        this,
        this.stagehand.llmClient,
        this.stagehand.userProvidedInstructions,
        this.stagehand.apiClient,
        this.stagehand.waitForCaptchaSolves
      ).init();
      this.pageMap.set(page, stagehandPage);
      return stagehandPage;
    });
  }
  static init(context, stagehand) {
    return __async(this, null, function* () {
      const instance = new _StagehandContext(context, stagehand);
      const existingPages = context.pages();
      for (const page of existingPages) {
        const stagehandPage = yield instance.createStagehandPage(page);
        if (!instance.activeStagehandPage) {
          instance.setActivePage(stagehandPage);
        }
      }
      return instance;
    });
  }
  get context() {
    return this.intContext;
  }
  getStagehandPage(page) {
    return __async(this, null, function* () {
      let stagehandPage = this.pageMap.get(page);
      if (!stagehandPage) {
        stagehandPage = yield this.createStagehandPage(page);
      }
      this.setActivePage(stagehandPage);
      return stagehandPage;
    });
  }
  getStagehandPages() {
    return __async(this, null, function* () {
      const pwPages = this.intContext.pages();
      return Promise.all(
        pwPages.map((page) => this.getStagehandPage(page))
      );
    });
  }
  setActivePage(page) {
    this.activeStagehandPage = page;
    this.stagehand["setActivePage"](page);
  }
  getActivePage() {
    return this.activeStagehandPage;
  }
};

// lib/api.ts
var import_zod_to_json_schema = __toESM(require("zod-to-json-schema"));
var StagehandAPI = class {
  constructor({ apiKey, projectId, logger }) {
    this.apiKey = apiKey;
    this.projectId = projectId;
    this.logger = logger;
  }
  init(_0) {
    return __async(this, arguments, function* ({
      modelName,
      modelApiKey,
      domSettleTimeoutMs,
      verbose,
      debugDom,
      systemPrompt,
      selfHeal,
      waitForCaptchaSolves,
      actionTimeoutMs,
      browserbaseSessionCreateParams
    }) {
      const sessionResponse = yield this.request("/sessions/start", {
        method: "POST",
        body: JSON.stringify({
          modelName,
          domSettleTimeoutMs,
          verbose,
          debugDom,
          systemPrompt,
          selfHeal,
          waitForCaptchaSolves,
          actionTimeoutMs,
          browserbaseSessionCreateParams
        }),
        headers: {
          "x-model-api-key": modelApiKey
        }
      });
      if (sessionResponse.status === 401) {
        throw new Error(
          "Unauthorized. Ensure you provided a valid API key and that it is whitelisted."
        );
      } else if (sessionResponse.status !== 200) {
        console.log(yield sessionResponse.text());
        throw new Error(`Unknown error: ${sessionResponse.status}`);
      }
      const sessionResponseBody = yield sessionResponse.json();
      if (sessionResponseBody.success === false) {
        throw new Error(sessionResponseBody.message);
      }
      this.sessionId = sessionResponseBody.data.sessionId;
      return sessionResponseBody.data;
    });
  }
  act(options) {
    return __async(this, null, function* () {
      return this.execute({
        method: "act",
        args: __spreadValues({}, options)
      });
    });
  }
  extract(options) {
    return __async(this, null, function* () {
      if (!options.schema) {
        return this.execute({
          method: "extract",
          args: {}
        });
      }
      const parsedSchema = (0, import_zod_to_json_schema.default)(options.schema);
      return this.execute({
        method: "extract",
        args: __spreadProps(__spreadValues({}, options), { schemaDefinition: parsedSchema })
      });
    });
  }
  observe(options) {
    return __async(this, null, function* () {
      return this.execute({
        method: "observe",
        args: __spreadValues({}, options)
      });
    });
  }
  goto(url, options) {
    return __async(this, null, function* () {
      return this.execute({
        method: "navigate",
        args: { url, options }
      });
    });
  }
  agentExecute(agentConfig, executeOptions) {
    return __async(this, null, function* () {
      return this.execute({
        method: "agentExecute",
        args: { agentConfig, executeOptions }
      });
    });
  }
  end() {
    return __async(this, null, function* () {
      const url = `/sessions/${this.sessionId}/end`;
      return yield this.request(url, {
        method: "POST"
      });
    });
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      method,
      args,
      params
    }) {
      const urlParams = new URLSearchParams(params);
      const queryString = urlParams.toString();
      const url = `/sessions/${this.sessionId}/${method}${queryString ? `?${queryString}` : ""}`;
      const response = yield this.request(url, {
        method: "POST",
        body: JSON.stringify(args)
      });
      if (!response.ok) {
        const errorBody = yield response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorBody}`
        );
      }
      if (!response.body) {
        throw new Error("Response body is null");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = yield reader.read();
        if (done && !buffer) {
          return null;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const eventData = JSON.parse(line.slice(6));
            if (eventData.type === "system") {
              if (eventData.data.status === "error") {
                throw new Error(eventData.data.error);
              }
              if (eventData.data.status === "finished") {
                return eventData.data.result;
              }
            } else if (eventData.type === "log") {
              this.logger(eventData.data.message);
            }
          } catch (e) {
            console.error("Error parsing event data:", e);
            throw new Error("Failed to parse server response");
          }
        }
        if (done) break;
      }
    });
  }
  request(_0) {
    return __async(this, arguments, function* (path4, options = {}) {
      const defaultHeaders = {
        "x-bb-api-key": this.apiKey,
        "x-bb-project-id": this.projectId,
        "x-bb-session-id": this.sessionId,
        // we want real-time logs, so we stream the response
        "x-stream-response": "true"
      };
      if (options.method === "POST" && options.body) {
        defaultHeaders["Content-Type"] = "application/json";
      }
      const response = yield fetch(`${process.env.STAGEHAND_API_URL}${path4}`, __spreadProps(__spreadValues({}, options), {
        headers: __spreadValues(__spreadValues({}, defaultHeaders), options.headers)
      }));
      return response;
    });
  }
};

// lib/dom/build/scriptContent.ts
var scriptContent = '(() => {\n  // lib/dom/elementCheckUtils.ts\n  function isElementNode(node) {\n    return node.nodeType === Node.ELEMENT_NODE;\n  }\n  function isTextNode(node) {\n    return node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim());\n  }\n  var leafElementDenyList = ["SVG", "IFRAME", "SCRIPT", "STYLE", "LINK"];\n  var interactiveElementTypes = [\n    "A",\n    "BUTTON",\n    "DETAILS",\n    "EMBED",\n    "INPUT",\n    "LABEL",\n    "MENU",\n    "MENUITEM",\n    "OBJECT",\n    "SELECT",\n    "TEXTAREA",\n    "SUMMARY"\n  ];\n  var interactiveRoles = [\n    "button",\n    "menu",\n    "menuitem",\n    "link",\n    "checkbox",\n    "radio",\n    "slider",\n    "tab",\n    "tabpanel",\n    "textbox",\n    "combobox",\n    "grid",\n    "listbox",\n    "option",\n    "progressbar",\n    "scrollbar",\n    "searchbox",\n    "switch",\n    "tree",\n    "treeitem",\n    "spinbutton",\n    "tooltip"\n  ];\n  var interactiveAriaRoles = ["menu", "menuitem", "button"];\n  var isVisible = (element) => {\n    const rect = element.getBoundingClientRect();\n    if (rect.width === 0 || rect.height === 0 || rect.top < 0 || rect.top > window.innerHeight) {\n      return false;\n    }\n    if (!isTopElement(element, rect)) {\n      return false;\n    }\n    const visible = element.checkVisibility({\n      checkOpacity: true,\n      checkVisibilityCSS: true\n    });\n    return visible;\n  };\n  var isTextVisible = (element) => {\n    const range = document.createRange();\n    range.selectNodeContents(element);\n    const rect = range.getBoundingClientRect();\n    if (rect.width === 0 || rect.height === 0 || rect.top < 0 || rect.top > window.innerHeight) {\n      return false;\n    }\n    const parent = element.parentElement;\n    if (!parent) {\n      return false;\n    }\n    const visible = parent.checkVisibility({\n      checkOpacity: true,\n      checkVisibilityCSS: true\n    });\n    return visible;\n  };\n  function isTopElement(elem, rect) {\n    const points = [\n      { x: rect.left + rect.width * 0.25, y: rect.top + rect.height * 0.25 },\n      { x: rect.left + rect.width * 0.75, y: rect.top + rect.height * 0.25 },\n      { x: rect.left + rect.width * 0.25, y: rect.top + rect.height * 0.75 },\n      { x: rect.left + rect.width * 0.75, y: rect.top + rect.height * 0.75 },\n      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }\n    ];\n    return points.some((point) => {\n      const topEl = document.elementFromPoint(point.x, point.y);\n      let current = topEl;\n      while (current && current !== document.body) {\n        if (current.isSameNode(elem)) {\n          return true;\n        }\n        current = current.parentElement;\n      }\n      return false;\n    });\n  }\n  var isActive = (element) => {\n    if (element.hasAttribute("disabled") || element.hasAttribute("hidden") || element.getAttribute("aria-disabled") === "true") {\n      return false;\n    }\n    return true;\n  };\n  var isInteractiveElement = (element) => {\n    const elementType = element.tagName;\n    const elementRole = element.getAttribute("role");\n    const elementAriaRole = element.getAttribute("aria-role");\n    return elementType && interactiveElementTypes.includes(elementType) || elementRole && interactiveRoles.includes(elementRole) || elementAriaRole && interactiveAriaRoles.includes(elementAriaRole);\n  };\n  var isLeafElement = (element) => {\n    if (element.textContent === "") {\n      return false;\n    }\n    if (element.childNodes.length === 0) {\n      return !leafElementDenyList.includes(element.tagName);\n    }\n    if (element.childNodes.length === 1 && isTextNode(element.childNodes[0])) {\n      return true;\n    }\n    return false;\n  };\n\n  // lib/dom/xpathUtils.ts\n  function getParentElement(node) {\n    return isElementNode(node) ? node.parentElement : node.parentNode;\n  }\n  function getCombinations(attributes, size) {\n    const results = [];\n    function helper(start, combo) {\n      if (combo.length === size) {\n        results.push([...combo]);\n        return;\n      }\n      for (let i = start; i < attributes.length; i++) {\n        combo.push(attributes[i]);\n        helper(i + 1, combo);\n        combo.pop();\n      }\n    }\n    helper(0, []);\n    return results;\n  }\n  function isXPathFirstResultElement(xpath, target) {\n    try {\n      const result = document.evaluate(\n        xpath,\n        document.documentElement,\n        null,\n        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,\n        null\n      );\n      return result.snapshotItem(0) === target;\n    } catch (error) {\n      console.warn(`Invalid XPath expression: ${xpath}`, error);\n      return false;\n    }\n  }\n  function escapeXPathString(value) {\n    if (value.includes("\'")) {\n      if (value.includes(\'"\')) {\n        return "concat(" + value.split(/(\'+)/).map((part) => {\n          if (part === "\'") {\n            return `"\'"`;\n          } else if (part.startsWith("\'") && part.endsWith("\'")) {\n            return `"${part}"`;\n          } else {\n            return `\'${part}\'`;\n          }\n        }).join(",") + ")";\n      } else {\n        return `"${value}"`;\n      }\n    } else {\n      return `\'${value}\'`;\n    }\n  }\n  async function generateXPathsForElement(element) {\n    if (!element) return [];\n    const [complexXPath, standardXPath, idBasedXPath] = await Promise.all([\n      generateComplexXPath(element),\n      generateStandardXPath(element),\n      generatedIdBasedXPath(element)\n    ]);\n    return [standardXPath, ...idBasedXPath ? [idBasedXPath] : [], complexXPath];\n  }\n  async function generateComplexXPath(element) {\n    const parts = [];\n    let currentElement = element;\n    while (currentElement && (isTextNode(currentElement) || isElementNode(currentElement))) {\n      if (isElementNode(currentElement)) {\n        const el = currentElement;\n        let selector = el.tagName.toLowerCase();\n        const attributePriority = [\n          "data-qa",\n          "data-component",\n          "data-role",\n          "role",\n          "aria-role",\n          "type",\n          "name",\n          "aria-label",\n          "placeholder",\n          "title",\n          "alt"\n        ];\n        const attributes = attributePriority.map((attr) => {\n          let value = el.getAttribute(attr);\n          if (attr === "href-full" && value) {\n            value = el.getAttribute("href");\n          }\n          return value ? { attr: attr === "href-full" ? "href" : attr, value } : null;\n        }).filter((attr) => attr !== null);\n        let uniqueSelector = "";\n        for (let i = 1; i <= attributes.length; i++) {\n          const combinations = getCombinations(attributes, i);\n          for (const combo of combinations) {\n            const conditions = combo.map((a) => `@${a.attr}=${escapeXPathString(a.value)}`).join(" and ");\n            const xpath2 = `//${selector}[${conditions}]`;\n            if (isXPathFirstResultElement(xpath2, el)) {\n              uniqueSelector = xpath2;\n              break;\n            }\n          }\n          if (uniqueSelector) break;\n        }\n        if (uniqueSelector) {\n          parts.unshift(uniqueSelector.replace("//", ""));\n          break;\n        } else {\n          const parent = getParentElement(el);\n          if (parent) {\n            const siblings = Array.from(parent.children).filter(\n              (sibling) => sibling.tagName === el.tagName\n            );\n            const index = siblings.indexOf(el) + 1;\n            selector += siblings.length > 1 ? `[${index}]` : "";\n          }\n          parts.unshift(selector);\n        }\n      }\n      currentElement = getParentElement(currentElement);\n    }\n    const xpath = "//" + parts.join("/");\n    return xpath;\n  }\n  async function generateStandardXPath(element) {\n    const parts = [];\n    while (element && (isTextNode(element) || isElementNode(element))) {\n      let index = 0;\n      let hasSameTypeSiblings = false;\n      const siblings = element.parentElement ? Array.from(element.parentElement.childNodes) : [];\n      for (let i = 0; i < siblings.length; i++) {\n        const sibling = siblings[i];\n        if (sibling.nodeType === element.nodeType && sibling.nodeName === element.nodeName) {\n          index = index + 1;\n          hasSameTypeSiblings = true;\n          if (sibling.isSameNode(element)) {\n            break;\n          }\n        }\n      }\n      if (element.nodeName !== "#text") {\n        const tagName = element.nodeName.toLowerCase();\n        const pathIndex = hasSameTypeSiblings ? `[${index}]` : "";\n        parts.unshift(`${tagName}${pathIndex}`);\n      }\n      element = element.parentElement;\n    }\n    return parts.length ? `/${parts.join("/")}` : "";\n  }\n  async function generatedIdBasedXPath(element) {\n    if (isElementNode(element) && element.id) {\n      return `//*[@id=\'${element.id}\']`;\n    }\n    return null;\n  }\n\n  // lib/dom/utils.ts\n  async function waitForDomSettle() {\n    return new Promise((resolve) => {\n      const createTimeout = () => {\n        return setTimeout(() => {\n          resolve();\n        }, 2e3);\n      };\n      let timeout = createTimeout();\n      const observer = new MutationObserver(() => {\n        clearTimeout(timeout);\n        timeout = createTimeout();\n      });\n      observer.observe(window.document.body, { childList: true, subtree: true });\n    });\n  }\n  function calculateViewportHeight() {\n    return Math.ceil(window.innerHeight * 0.75);\n  }\n  function canElementScroll(elem) {\n    if (typeof elem.scrollTo !== "function") {\n      console.warn("canElementScroll: .scrollTo is not a function.");\n      return false;\n    }\n    try {\n      const originalTop = elem.scrollTop;\n      elem.scrollTo({\n        top: originalTop + 100,\n        left: 0,\n        behavior: "instant"\n      });\n      if (elem.scrollTop === originalTop) {\n        throw new Error("scrollTop did not change");\n      }\n      elem.scrollTo({\n        top: originalTop,\n        left: 0,\n        behavior: "instant"\n      });\n      return true;\n    } catch (error) {\n      console.warn("canElementScroll error:", error.message || error);\n      return false;\n    }\n  }\n  function getNodeFromXpath(xpath) {\n    return document.evaluate(\n      xpath,\n      document.documentElement,\n      null,\n      XPathResult.FIRST_ORDERED_NODE_TYPE,\n      null\n    ).singleNodeValue;\n  }\n\n  // lib/dom/candidateCollector.ts\n  var xpathCache = /* @__PURE__ */ new Map();\n  async function collectCandidateElements(candidateContainerRoot, indexOffset = 0) {\n    const DOMQueue = [...candidateContainerRoot.childNodes];\n    const candidateElements = [];\n    while (DOMQueue.length > 0) {\n      const node = DOMQueue.pop();\n      let shouldAdd = false;\n      if (node && isElementNode(node)) {\n        for (let i = node.childNodes.length - 1; i >= 0; i--) {\n          DOMQueue.push(node.childNodes[i]);\n        }\n        if (isInteractiveElement(node)) {\n          if (isActive(node) && isVisible(node)) {\n            shouldAdd = true;\n          }\n        }\n        if (isLeafElement(node)) {\n          if (isActive(node) && isVisible(node)) {\n            shouldAdd = true;\n          }\n        }\n      }\n      if (node && isTextNode(node) && isTextVisible(node)) {\n        shouldAdd = true;\n      }\n      if (shouldAdd) {\n        candidateElements.push(node);\n      }\n    }\n    const selectorMap = {};\n    let outputString = "";\n    const xpathLists = await Promise.all(\n      candidateElements.map((elem) => {\n        if (xpathCache.has(elem)) {\n          return Promise.resolve(xpathCache.get(elem));\n        }\n        return generateXPathsForElement(elem).then((xpaths) => {\n          xpathCache.set(elem, xpaths);\n          return xpaths;\n        });\n      })\n    );\n    candidateElements.forEach((elem, idx) => {\n      const xpaths = xpathLists[idx];\n      let elemOutput = "";\n      if (isTextNode(elem)) {\n        const textContent = elem.textContent?.trim();\n        if (textContent) {\n          elemOutput += `${idx + indexOffset}:${textContent}\n`;\n        }\n      } else if (isElementNode(elem)) {\n        const tagName = elem.tagName.toLowerCase();\n        const attributes = collectEssentialAttributes(elem);\n        const opening = `<${tagName}${attributes ? " " + attributes : ""}>`;\n        const closing = `</${tagName}>`;\n        const textContent = elem.textContent?.trim() || "";\n        elemOutput += `${idx + indexOffset}:${opening}${textContent}${closing}\n`;\n      }\n      outputString += elemOutput;\n      selectorMap[idx + indexOffset] = xpaths;\n    });\n    return { outputString, selectorMap };\n  }\n  function collectEssentialAttributes(element) {\n    const essentialAttributes = [\n      "id",\n      "class",\n      "href",\n      "src",\n      "aria-label",\n      "aria-name",\n      "aria-role",\n      "aria-description",\n      "aria-expanded",\n      "aria-haspopup",\n      "type",\n      "value"\n    ];\n    const attrs = essentialAttributes.map((attr) => {\n      const value = element.getAttribute(attr);\n      return value ? `${attr}="${value}"` : "";\n    }).filter((attr) => attr !== "");\n    Array.from(element.attributes).forEach((attr) => {\n      if (attr.name.startsWith("data-")) {\n        attrs.push(`${attr.name}="${attr.value}"`);\n      }\n    });\n    return attrs.join(" ");\n  }\n\n  // lib/dom/StagehandContainer.ts\n  var StagehandContainer = class {\n    /**\n     * Collects multiple "DOM chunks" by scrolling through the container\n     * in increments from `startOffset` to `endOffset`. At each scroll\n     * position, the function extracts a snapshot of "candidate elements"\n     * using `collectCandidateElements`.\n     *\n     * Each chunk represents a subset of the DOM at a particular\n     * vertical scroll offset, including:\n     *\n     * - `startOffset` & `endOffset`: The vertical scroll bounds for this chunk.\n     * - `outputString`: A serialized representation of extracted DOM text.\n     * - `selectorMap`: A mapping of temporary indices to the actual element(s)\n     *   that were collected in this chunk, useful for further processing.\n     *\n     * @param startOffset - The initial scroll offset from which to begin collecting.\n     * @param endOffset - The maximum scroll offset to collect up to.\n     * @param chunkSize - The vertical increment to move between each chunk.\n     * @param scrollTo - Whether we should scroll to the chunk\n     * @param scrollBackToTop - Whether to scroll the container back to the top once finished.\n     * @param candidateContainer - Optionally, a specific container element within\n     * the root for which to collect data. If omitted, uses `this.getRootElement()`.\n     *\n     * @returns A promise that resolves with an array of `DomChunk` objects.\n     *\n     * ### How It Works\n     *\n     * 1. **Scroll Range Calculation**:\n     *    - Computes `maxOffset` as the maximum offset that can be scrolled\n     *      (`scrollHeight - viewportHeight`).\n     *    - Restricts `endOffset` to not exceed `maxOffset`.\n     *\n     * 2. **Chunk Iteration**:\n     *    - Loops from `startOffset` to `endOffset` in steps of `chunkSize`.\n     *    - For each offset `current`, we call `this.scrollTo(current)`\n     *      to position the container.\n     *\n     * 3. **Element Collection**:\n     *    - Invokes `collectCandidateElements` on either `candidateContainer`\n     *      (if provided) or the result of `this.getRootElement()`.\n     *    - This returns both an `outputString` (serialized text)\n     *      and a `selectorMap` of found elements for that section of the DOM.\n     *\n     * 4. **Chunk Assembly**:\n     *    - Creates a `DomChunk` object for the current offset range,\n     *      storing `outputString`, `selectorMap`, and scroll offsets.\n     *    - Pushes it onto the `chunks` array.\n     *\n     * 5. **Scroll Reset**:\n     *    - Once iteration completes, if `scrollBackToTop` is `true`,\n     *      we scroll back to offset `0`.\n     */\n    async collectDomChunks(startOffset, endOffset, chunkSize, scrollTo = true, scrollBackToTop = true, candidateContainer) {\n      const chunks = [];\n      let maxOffset = this.getScrollHeight();\n      let current = startOffset;\n      let finalEnd = endOffset;\n      let index = 0;\n      while (current <= finalEnd) {\n        if (scrollTo) {\n          await this.scrollTo(current);\n        }\n        const rootCandidate = candidateContainer || this.getRootElement();\n        const { outputString, selectorMap } = await collectCandidateElements(\n          rootCandidate,\n          index\n        );\n        chunks.push({\n          startOffset: current,\n          endOffset: current + chunkSize,\n          outputString,\n          selectorMap\n        });\n        index += Object.keys(selectorMap).length;\n        current += chunkSize;\n        if (!candidateContainer && current > endOffset) {\n          const newScrollHeight = this.getScrollHeight();\n          if (newScrollHeight > maxOffset) {\n            maxOffset = newScrollHeight;\n          }\n          if (newScrollHeight > finalEnd) {\n            finalEnd = newScrollHeight;\n          }\n        }\n      }\n      if (scrollBackToTop) {\n        await this.scrollTo(0);\n      }\n      return chunks;\n    }\n  };\n\n  // lib/dom/GlobalPageContainer.ts\n  var GlobalPageContainer = class extends StagehandContainer {\n    getRootElement() {\n      return document.body;\n    }\n    /**\n     * Calculates the viewport height for the entire page, using a helper.\n     * The helper returns 75% of the window height, to ensure that we don\'t\n     * miss any content that may be behind sticky elements like nav bars.\n     *\n     * @returns The current height of the global viewport, in pixels.\n     */\n    getViewportHeight() {\n      return calculateViewportHeight();\n    }\n    getScrollHeight() {\n      return document.documentElement.scrollHeight;\n    }\n    getScrollPosition() {\n      return window.scrollY;\n    }\n    /**\n     * Smoothly scrolls the page to the specified vertical offset, and then\n     * waits until scrolling has stopped. There is a delay built in to allow\n     * for lazy loading and other asynchronous content to load.\n     *\n     * @param offset - The desired scroll offset from the top of the page.\n     * @returns A promise that resolves once scrolling is complete.\n     */\n    async scrollTo(offset) {\n      await new Promise((resolve) => setTimeout(resolve, 1500));\n      window.scrollTo({ top: offset, behavior: "smooth" });\n      await this.waitForScrollEnd();\n    }\n    /**\n     * Scrolls the page so that a given element is visible, or scrolls to the top\n     * if no element is specified. Uses smooth scrolling and waits for it to complete.\n     *\n     * @param element - The DOM element to bring into view. If omitted, scrolls to top.\n     * @returns A promise that resolves once scrolling is complete.\n     */\n    async scrollIntoView(element) {\n      if (!element) {\n        window.scrollTo({ top: 0, behavior: "smooth" });\n      } else {\n        const rect = element.getBoundingClientRect();\n        const currentY = window.scrollY || document.documentElement.scrollTop;\n        const elementY = currentY + rect.top - window.innerHeight * 0.25;\n        window.scrollTo({ top: elementY, behavior: "smooth" });\n      }\n      await this.waitForScrollEnd();\n    }\n    /**\n     * Internal helper that waits until the global scroll activity has stopped.\n     * It listens for scroll events, resetting a short timer every time a scroll\n     * occurs, and resolves once there\'s no scroll for ~100ms.\n     *\n     * @returns A promise that resolves when scrolling has finished.\n     */\n    async waitForScrollEnd() {\n      return new Promise((resolve) => {\n        let scrollEndTimer;\n        const handleScroll = () => {\n          clearTimeout(scrollEndTimer);\n          scrollEndTimer = window.setTimeout(() => {\n            window.removeEventListener("scroll", handleScroll);\n            resolve();\n          }, 100);\n        };\n        window.addEventListener("scroll", handleScroll, { passive: true });\n        handleScroll();\n      });\n    }\n  };\n\n  // lib/dom/ElementContainer.ts\n  var ElementContainer = class extends StagehandContainer {\n    /**\n     * Creates an instance of `ElementContainer` tied to a specific element.\n     * @param el - The scrollable `HTMLElement` that this container controls.\n     */\n    constructor(el) {\n      super();\n      this.el = el;\n    }\n    getRootElement() {\n      return this.el;\n    }\n    /**\n     * Retrieves the height of the visible viewport within this element\n     * (`el.clientHeight`).\n     *\n     * @returns The visible (client) height of the element, in pixels.\n     */\n    getViewportHeight() {\n      return this.el.clientHeight;\n    }\n    getScrollHeight() {\n      return this.el.scrollHeight;\n    }\n    /**\n     * Returns the element\'s current vertical scroll offset.\n     */\n    getScrollPosition() {\n      return this.el.scrollTop;\n    }\n    /**\n     * Smoothly scrolls this element to the specified vertical offset, and\n     * waits for the scrolling to complete.\n     *\n     * @param offset - The scroll offset (in pixels) from the top of the element.\n     * @returns A promise that resolves once scrolling is finished.\n     */\n    async scrollTo(offset) {\n      await new Promise((resolve) => setTimeout(resolve, 1500));\n      this.el.scrollTo({ top: offset, behavior: "smooth" });\n      await this.waitForScrollEnd();\n    }\n    /**\n     * Scrolls this element so that the given `element` is visible, or\n     * scrolls to the top if none is provided. Smoothly animates the scroll\n     * and waits until it finishes.\n     *\n     * @param element - The child element to bring into view. If omitted, scrolls to top.\n     * @returns A promise that resolves once scrolling completes.\n     */\n    async scrollIntoView(element) {\n      if (!element) {\n        this.el.scrollTo({ top: 0, behavior: "smooth" });\n      } else {\n        element.scrollIntoView();\n      }\n      await this.waitForScrollEnd();\n    }\n    /**\n     * Internal helper that waits until scrolling in this element has\n     * fully stopped. It listens for scroll events on the element,\n     * resetting a short timer every time a scroll occurs, and resolves\n     * once there\'s no scroll for ~100ms.\n     *\n     * @returns A promise that resolves when scrolling has finished.\n     */\n    async waitForScrollEnd() {\n      return new Promise((resolve) => {\n        let scrollEndTimer;\n        const handleScroll = () => {\n          clearTimeout(scrollEndTimer);\n          scrollEndTimer = window.setTimeout(() => {\n            this.el.removeEventListener("scroll", handleScroll);\n            resolve();\n          }, 100);\n        };\n        this.el.addEventListener("scroll", handleScroll, { passive: true });\n        handleScroll();\n      });\n    }\n  };\n\n  // lib/dom/containerFactory.ts\n  function createStagehandContainer(obj) {\n    if (obj instanceof Window) {\n      return new GlobalPageContainer();\n    } else {\n      return new ElementContainer(obj);\n    }\n  }\n\n  // lib/dom/process.ts\n  function getScrollableElements(topN) {\n    const docEl = document.documentElement;\n    const scrollableElements = [docEl];\n    const allElements = document.querySelectorAll("*");\n    for (const elem of allElements) {\n      const style = window.getComputedStyle(elem);\n      const overflowY = style.overflowY;\n      const isPotentiallyScrollable = overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";\n      if (isPotentiallyScrollable) {\n        const candidateScrollDiff = elem.scrollHeight - elem.clientHeight;\n        if (candidateScrollDiff > 0 && canElementScroll(elem)) {\n          scrollableElements.push(elem);\n        }\n      }\n    }\n    scrollableElements.sort((a, b) => b.scrollHeight - a.scrollHeight);\n    if (topN !== void 0) {\n      return scrollableElements.slice(0, topN);\n    }\n    return scrollableElements;\n  }\n  async function getScrollableElementXpaths(topN) {\n    const scrollableElems = getScrollableElements(topN);\n    const xpaths = [];\n    for (const elem of scrollableElems) {\n      const allXPaths = await generateXPathsForElement(elem);\n      const firstXPath = allXPaths?.[0] || "";\n      xpaths.push(firstXPath);\n    }\n    return xpaths;\n  }\n  function getNearestScrollableParent(el) {\n    const allScrollables = getScrollableElements();\n    let current = el;\n    while (current) {\n      if (allScrollables.includes(current)) {\n        return current;\n      }\n      current = current.parentElement;\n    }\n    return document.documentElement;\n  }\n  async function processDom(chunksSeen) {\n    const { chunk, chunksArray } = await pickChunk(chunksSeen);\n    const container = new GlobalPageContainer();\n    const chunkSize = container.getViewportHeight();\n    const startOffset = chunk * chunkSize;\n    const endOffset = startOffset;\n    const domChunks = await container.collectDomChunks(\n      startOffset,\n      endOffset,\n      chunkSize,\n      true,\n      false,\n      // scrollBackToTop\n      container.getRootElement()\n      // BFS entire doc\n    );\n    const [domChunk] = domChunks;\n    if (!domChunk) {\n      return {\n        outputString: "",\n        selectorMap: {},\n        chunk,\n        chunks: chunksArray\n      };\n    }\n    console.log("Extracted DOM chunk:\\n", domChunk.outputString);\n    return {\n      outputString: domChunk.outputString,\n      selectorMap: domChunk.selectorMap,\n      chunk,\n      chunks: chunksArray\n    };\n  }\n  async function processAllOfDom(xpath) {\n    let candidateElementContainer = null;\n    let scrollTarget;\n    if (xpath) {\n      const node = getNodeFromXpath(xpath);\n      if (node) {\n        candidateElementContainer = node;\n        console.log(`Found element via XPath: ${xpath}`);\n        const scrollableElem = getNearestScrollableParent(\n          candidateElementContainer\n        );\n        if (scrollableElem === document.documentElement) {\n          scrollTarget = new GlobalPageContainer();\n        } else {\n          scrollTarget = new ElementContainer(scrollableElem);\n        }\n        await scrollTarget.scrollIntoView(candidateElementContainer);\n        const startOffset2 = scrollTarget.getScrollPosition();\n        const scrollTargetHeight = scrollTarget.getViewportHeight();\n        const candidateElementContainerHeight = candidateElementContainer.scrollHeight;\n        if (candidateElementContainerHeight <= scrollTargetHeight) {\n          console.log(\n            "Element is smaller/equal to container\\u2019s viewport. Doing single chunk."\n          );\n          const domChunks2 = await scrollTarget.collectDomChunks(\n            startOffset2,\n            // startOffset\n            startOffset2,\n            // endOffset => same as start => 1 chunk\n            1,\n            // chunkSize=1 => doesn\'t matter, because start==end means exactly 1 iteration\n            true,\n            true,\n            candidateElementContainer\n          );\n          const singleChunkOutput = combineChunks(domChunks2);\n          console.log(\n            "Final output (single-chunk):",\n            singleChunkOutput.outputString\n          );\n          return singleChunkOutput;\n        }\n        console.log("Element is bigger. Doing multi-chunk approach.");\n      } else {\n        console.warn(`XPath not found: ${xpath}. Using entire doc.`);\n      }\n    } else {\n      const scrollableElems = getScrollableElements(1);\n      const mainScrollable = scrollableElems[0];\n      scrollTarget = mainScrollable === document.documentElement ? createStagehandContainer(window) : createStagehandContainer(mainScrollable);\n    }\n    const startOffset = scrollTarget.getScrollPosition();\n    const viewportHeight = scrollTarget.getViewportHeight();\n    const maxScroll = candidateElementContainer ? startOffset + candidateElementContainer.scrollHeight : scrollTarget.getScrollHeight();\n    const chunkSize = viewportHeight;\n    console.log("processAllOfDom chunk-based from", startOffset, "to", maxScroll);\n    const domChunks = await scrollTarget.collectDomChunks(\n      startOffset,\n      maxScroll,\n      chunkSize,\n      true,\n      true,\n      candidateElementContainer ?? void 0\n    );\n    const finalOutput = combineChunks(domChunks);\n    console.log(\n      "All DOM elements combined (chunk-based):",\n      finalOutput.outputString\n    );\n    return finalOutput;\n  }\n  function combineChunks(domChunks) {\n    const outputString = domChunks.map((c) => c.outputString).join("");\n    let finalSelectorMap = {};\n    domChunks.forEach((c) => {\n      finalSelectorMap = { ...finalSelectorMap, ...c.selectorMap };\n    });\n    return { outputString, selectorMap: finalSelectorMap };\n  }\n  function storeDOM(xpath) {\n    if (!xpath) {\n      const originalDOM = document.body.cloneNode(true);\n      console.log("DOM state stored (root).");\n      return originalDOM.outerHTML;\n    } else {\n      const node = getNodeFromXpath(xpath);\n      if (!node) {\n        console.error(\n          `storeDOM: No element found for xpath: ${xpath}. Returning empty string.`\n        );\n        return "";\n      }\n      console.log(`DOM state stored (element at xpath: ${xpath}).`);\n      return node.outerHTML;\n    }\n  }\n  function restoreDOM(storedDOM, xpath) {\n    console.log("Restoring DOM...");\n    if (!storedDOM) {\n      console.error("No DOM state was provided.");\n      return;\n    }\n    if (!xpath) {\n      document.body.innerHTML = storedDOM;\n      console.log("DOM restored (root).");\n    } else {\n      const node = getNodeFromXpath(xpath);\n      if (!node) {\n        console.error(\n          `restoreDOM: No element found for xpath: ${xpath}. Cannot restore.`\n        );\n        return;\n      }\n      node.outerHTML = storedDOM;\n      console.log(`DOM restored (element at xpath: ${xpath}).`);\n    }\n  }\n  function createTextBoundingBoxes(xpath) {\n    const style = document.createElement("style");\n    document.head.appendChild(style);\n    if (style.sheet) {\n      style.sheet.insertRule(\n        `\n      .stagehand-highlighted-word, .stagehand-space {\n        border: 0px solid orange;\n        display: inline-block !important;\n        visibility: visible;\n      }\n    `,\n        0\n      );\n      style.sheet.insertRule(\n        `\n        code .stagehand-highlighted-word, code .stagehand-space,\n        pre .stagehand-highlighted-word, pre .stagehand-space {\n          white-space: pre-wrap;\n          display: inline !important;\n      }\n     `,\n        1\n      );\n    }\n    function applyHighlighting(root) {\n      const containerSelector = root instanceof Document ? "body *" : "*";\n      root.querySelectorAll(containerSelector).forEach((element) => {\n        if (element.closest && element.closest(".stagehand-nav, .stagehand-marker")) {\n          return;\n        }\n        if (["SCRIPT", "STYLE", "IFRAME", "INPUT"].includes(element.tagName)) {\n          return;\n        }\n        const childNodes = Array.from(element.childNodes);\n        childNodes.forEach((node) => {\n          if (node.nodeType === 3 && node.textContent?.trim().length > 0) {\n            const textContent = node.textContent.replace(/\\u00A0/g, " ");\n            const tokens = textContent.split(/(\\s+)/g);\n            const fragment = document.createDocumentFragment();\n            const parentIsCode = element.tagName === "CODE";\n            tokens.forEach((token) => {\n              const span = document.createElement("span");\n              span.textContent = token;\n              if (parentIsCode) {\n                span.style.whiteSpace = "pre-wrap";\n                span.style.display = "inline";\n              }\n              span.className = token.trim().length === 0 ? "stagehand-space" : "stagehand-highlighted-word";\n              fragment.appendChild(span);\n            });\n            if (fragment.childNodes.length > 0 && node.parentNode) {\n              element.insertBefore(fragment, node);\n              node.remove();\n            }\n          }\n        });\n      });\n    }\n    if (!xpath) {\n      applyHighlighting(document);\n      document.querySelectorAll("iframe").forEach((iframe) => {\n        try {\n          iframe.contentWindow?.postMessage({ action: "highlight" }, "*");\n        } catch (error) {\n          console.error("Error accessing iframe content: ", error);\n        }\n      });\n    } else {\n      const node = getNodeFromXpath(xpath);\n      if (!node) {\n        console.warn(\n          `createTextBoundingBoxes: No element found for xpath "${xpath}".`\n        );\n        return;\n      }\n      applyHighlighting(node);\n    }\n  }\n  function getElementBoundingBoxes(xpath) {\n    const element = getNodeFromXpath(xpath);\n    if (!element) return [];\n    const isValidText = (text) => text && text.trim().length > 0;\n    let dropDownElem = element.querySelector("option[selected]");\n    if (!dropDownElem) {\n      dropDownElem = element.querySelector("option");\n    }\n    if (dropDownElem) {\n      const elemText = dropDownElem.textContent || "";\n      if (isValidText(elemText)) {\n        const parentRect = element.getBoundingClientRect();\n        return [\n          {\n            text: elemText.trim(),\n            top: parentRect.top + window.scrollY,\n            left: parentRect.left + window.scrollX,\n            width: parentRect.width,\n            height: parentRect.height\n          }\n        ];\n      } else {\n        return [];\n      }\n    }\n    let placeholderText = "";\n    if ((element.tagName.toLowerCase() === "input" || element.tagName.toLowerCase() === "textarea") && element.placeholder) {\n      placeholderText = element.placeholder;\n    } else if (element.tagName.toLowerCase() === "a") {\n      placeholderText = "";\n    } else if (element.tagName.toLowerCase() === "img") {\n      placeholderText = element.alt || "";\n    }\n    const words = element.querySelectorAll(\n      ".stagehand-highlighted-word"\n    );\n    const boundingBoxes = Array.from(words).map((word) => {\n      const rect = word.getBoundingClientRect();\n      return {\n        text: word.innerText || "",\n        top: rect.top + window.scrollY,\n        left: rect.left + window.scrollX,\n        width: rect.width,\n        height: rect.height * 0.75\n      };\n    }).filter(\n      (box) => box.width > 0 && box.height > 0 && box.top >= 0 && box.left >= 0 && isValidText(box.text)\n    );\n    if (boundingBoxes.length === 0) {\n      const elementRect = element.getBoundingClientRect();\n      return [\n        {\n          text: placeholderText,\n          top: elementRect.top + window.scrollY,\n          left: elementRect.left + window.scrollX,\n          width: elementRect.width,\n          height: elementRect.height * 0.75\n        }\n      ];\n    }\n    return boundingBoxes;\n  }\n  window.waitForDomSettle = waitForDomSettle;\n  window.processDom = processDom;\n  window.processAllOfDom = processAllOfDom;\n  window.storeDOM = storeDOM;\n  window.restoreDOM = restoreDOM;\n  window.createTextBoundingBoxes = createTextBoundingBoxes;\n  window.getElementBoundingBoxes = getElementBoundingBoxes;\n  window.createStagehandContainer = createStagehandContainer;\n  window.getScrollableElementXpaths = getScrollableElementXpaths;\n  window.getNodeFromXpath = getNodeFromXpath;\n  async function pickChunk(chunksSeen) {\n    const viewportHeight = calculateViewportHeight();\n    const documentHeight = document.documentElement.scrollHeight;\n    const chunks = Math.ceil(documentHeight / viewportHeight);\n    const chunksArray = Array.from({ length: chunks }, (_, i) => i);\n    const chunksRemaining = chunksArray.filter((chunk2) => {\n      return !chunksSeen.includes(chunk2);\n    });\n    const currentScrollPosition = window.scrollY;\n    const closestChunk = chunksRemaining.reduce((closest, current) => {\n      const currentChunkTop = viewportHeight * current;\n      const closestChunkTop = viewportHeight * closest;\n      return Math.abs(currentScrollPosition - currentChunkTop) < Math.abs(currentScrollPosition - closestChunkTop) ? current : closest;\n    }, chunksRemaining[0]);\n    const chunk = closestChunk;\n    if (chunk === void 0) {\n      throw new Error(`No chunks remaining to check: ${chunksRemaining}`);\n    }\n    return {\n      chunk,\n      chunksArray\n    };\n  }\n})();\n';

// lib/cache/LLMCache.ts
var LLMCache = class _LLMCache extends BaseCache {
  constructor(logger, cacheDir, cacheFile) {
    super(logger, cacheDir, cacheFile || "llm_calls.json");
  }
  /**
   * Overrides the get method to track used hashes by requestId.
   * @param options - The options used to generate the cache key.
   * @param requestId - The identifier for the current request.
   * @returns The cached data if available, otherwise null.
   */
  get(options, requestId) {
    return __async(this, null, function* () {
      const data = yield __superGet(_LLMCache.prototype, this, "get").call(this, options, requestId);
      return data;
    });
  }
  /**
   * Overrides the set method to include cache cleanup logic.
   * @param options - The options used to generate the cache key.
   * @param data - The data to be cached.
   * @param requestId - The identifier for the current request.
   */
  set(options, data, requestId) {
    return __async(this, null, function* () {
      yield __superGet(_LLMCache.prototype, this, "set").call(this, options, data, requestId);
      this.logger({
        category: "llm_cache",
        message: "Cache miss - saved new response",
        level: 1
      });
    });
  }
};

// lib/llm/AnthropicClient.ts
var import_sdk2 = __toESM(require("@anthropic-ai/sdk"));
var import_zod_to_json_schema2 = require("zod-to-json-schema");

// lib/llm/LLMClient.ts
var AnnotatedScreenshotText = "This is a screenshot of the current page state with the elements annotated on it. Each element id is annotated with a number to the top left of it. Duplicate annotations at the same location are under each other vertically.";
var LLMClient = class {
  constructor(modelName, userProvidedInstructions) {
    this.modelName = modelName;
    this.userProvidedInstructions = userProvidedInstructions;
  }
};

// lib/llm/AnthropicClient.ts
var AnthropicClient = class extends LLMClient {
  constructor({
    enableCaching = false,
    cache,
    modelName,
    clientOptions,
    userProvidedInstructions,
    remoteClientHandler
  }) {
    super(modelName);
    this.type = "anthropic";
    this.client = !remoteClientHandler ? new import_sdk2.default(clientOptions) : null;
    this.cache = cache;
    this.enableCaching = enableCaching;
    this.modelName = modelName;
    this.clientOptions = clientOptions;
    this.userProvidedInstructions = userProvidedInstructions;
  }
  createChatCompletion(_0) {
    return __async(this, arguments, function* ({
      options,
      retries,
      logger
    }) {
      var _a, _b;
      const optionsWithoutImage = __spreadValues({}, options);
      delete optionsWithoutImage.image;
      logger({
        category: "anthropic",
        message: "creating chat completion",
        level: 1,
        auxiliary: {
          options: {
            value: JSON.stringify(optionsWithoutImage),
            type: "object"
          }
        }
      });
      const cacheOptions = {
        model: this.modelName,
        messages: options.messages,
        temperature: options.temperature,
        image: options.image,
        response_model: options.response_model,
        tools: options.tools,
        retries
      };
      if (this.enableCaching) {
        const cachedResponse = yield this.cache.get(
          cacheOptions,
          options.requestId
        );
        if (cachedResponse) {
          logger({
            category: "llm_cache",
            message: "LLM cache hit - returning cached response",
            level: 1,
            auxiliary: {
              cachedResponse: {
                value: JSON.stringify(cachedResponse),
                type: "object"
              },
              requestId: {
                value: options.requestId,
                type: "string"
              },
              cacheOptions: {
                value: JSON.stringify(cacheOptions),
                type: "object"
              }
            }
          });
          return cachedResponse;
        } else {
          logger({
            category: "llm_cache",
            message: "LLM cache miss - no cached response found",
            level: 1,
            auxiliary: {
              cacheOptions: {
                value: JSON.stringify(cacheOptions),
                type: "object"
              },
              requestId: {
                value: options.requestId,
                type: "string"
              }
            }
          });
        }
      }
      const systemMessage = options.messages.find((msg) => {
        if (msg.role === "system") {
          if (typeof msg.content === "string") {
            return true;
          } else if (Array.isArray(msg.content)) {
            return msg.content.every((content) => content.type !== "image_url");
          }
        }
        return false;
      });
      const userMessages = options.messages.filter(
        (msg) => msg.role !== "system"
      );
      const formattedMessages = userMessages.map((msg) => {
        if (typeof msg.content === "string") {
          return {
            role: msg.role,
            // ensure its not checking for system types
            content: msg.content
          };
        } else {
          return {
            role: msg.role,
            content: msg.content.map((content) => {
              if ("image_url" in content) {
                const formattedContent = {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: "image/jpeg",
                    data: content.image_url.url
                  }
                };
                return formattedContent;
              } else {
                return { type: "text", text: content.text };
              }
            })
          };
        }
      });
      if (options.image) {
        const screenshotMessage = {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: options.image.buffer.toString("base64")
              }
            }
          ]
        };
        if (options.image.description && Array.isArray(screenshotMessage.content)) {
          screenshotMessage.content.push({
            type: "text",
            text: options.image.description
          });
        }
        formattedMessages.push(screenshotMessage);
      }
      let anthropicTools = (_a = options.tools) == null ? void 0 : _a.map((tool) => {
        return {
          name: tool.name,
          description: tool.description,
          input_schema: {
            type: "object",
            properties: tool.parameters.properties,
            required: tool.parameters.required
          }
        };
      });
      let toolDefinition;
      if (options.response_model) {
        const jsonSchema = (0, import_zod_to_json_schema2.zodToJsonSchema)(options.response_model.schema);
        const { properties: schemaProperties, required: schemaRequired } = extractSchemaProperties(jsonSchema);
        toolDefinition = {
          name: "print_extracted_data",
          description: "Prints the extracted data based on the provided schema.",
          input_schema: {
            type: "object",
            properties: schemaProperties,
            required: schemaRequired
          }
        };
      }
      if (toolDefinition) {
        anthropicTools = anthropicTools != null ? anthropicTools : [];
        anthropicTools.push(toolDefinition);
      }
      const body = {
        model: this.modelName,
        max_tokens: options.maxTokens || 8192,
        messages: formattedMessages,
        tools: anthropicTools,
        system: systemMessage ? systemMessage.content : void 0,
        temperature: options.temperature
      };
      let response;
      if (this.remoteClientHandler) {
        response = yield this.remoteClientHandler("anthropic", {
          clientOptions: this.clientOptions,
          body
        });
      } else {
        response = yield this.client.messages.create(body);
      }
      logger({
        category: "anthropic",
        message: "response",
        level: 1,
        auxiliary: {
          response: {
            value: JSON.stringify(response),
            type: "object"
          },
          requestId: {
            value: options.requestId,
            type: "string"
          }
        }
      });
      const usageData = {
        prompt_tokens: response.usage.input_tokens,
        completion_tokens: response.usage.output_tokens,
        total_tokens: response.usage.input_tokens + response.usage.output_tokens
      };
      const transformedResponse = {
        id: response.id,
        object: "chat.completion",
        created: Date.now(),
        model: response.model,
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: ((_b = response.content.find((c) => c.type === "text")) == null ? void 0 : _b.text) || null,
              tool_calls: response.content.filter((c) => c.type === "tool_use").map((toolUse) => ({
                id: toolUse.id,
                type: "function",
                function: {
                  name: toolUse.name,
                  arguments: JSON.stringify(toolUse.input)
                }
              }))
            },
            finish_reason: response.stop_reason
          }
        ],
        usage: usageData
      };
      logger({
        category: "anthropic",
        message: "transformed response",
        level: 1,
        auxiliary: {
          transformedResponse: {
            value: JSON.stringify(transformedResponse),
            type: "object"
          },
          requestId: {
            value: options.requestId,
            type: "string"
          }
        }
      });
      if (options.response_model) {
        const toolUse = response.content.find((c) => c.type === "tool_use");
        if (toolUse && "input" in toolUse) {
          const result = toolUse.input;
          const finalParsedResponse = {
            data: result,
            usage: usageData
          };
          if (this.enableCaching) {
            this.cache.set(cacheOptions, finalParsedResponse, options.requestId);
          }
          return finalParsedResponse;
        } else {
          if (!retries || retries < 5) {
            return this.createChatCompletion({
              options,
              logger,
              retries: (retries != null ? retries : 0) + 1
            });
          }
          logger({
            category: "anthropic",
            message: "error creating chat completion",
            level: 1,
            auxiliary: {
              requestId: {
                value: options.requestId,
                type: "string"
              }
            }
          });
          throw new Error(
            "Create Chat Completion Failed: No tool use with input in response"
          );
        }
      }
      if (this.enableCaching) {
        this.cache.set(cacheOptions, transformedResponse, options.requestId);
        logger({
          category: "anthropic",
          message: "cached response",
          level: 1,
          auxiliary: {
            requestId: {
              value: options.requestId,
              type: "string"
            },
            transformedResponse: {
              value: JSON.stringify(transformedResponse),
              type: "object"
            },
            cacheOptions: {
              value: JSON.stringify(cacheOptions),
              type: "object"
            }
          }
        });
      }
      return transformedResponse;
    });
  }
};
var extractSchemaProperties = (jsonSchema) => {
  var _a;
  const schemaRoot = ((_a = jsonSchema.definitions) == null ? void 0 : _a.MySchema) || jsonSchema;
  return {
    properties: schemaRoot.properties,
    required: schemaRoot.required
  };
};

// lib/llm/CerebrasClient.ts
var import_openai = __toESM(require("openai"));
var import_zod_to_json_schema3 = require("zod-to-json-schema");
var CerebrasClient = class extends LLMClient {
  constructor({
    enableCaching = false,
    cache,
    modelName,
    clientOptions,
    userProvidedInstructions,
    remoteClientHandler
  }) {
    super(modelName, userProvidedInstructions);
    this.type = "cerebras";
    this.hasVision = false;
    this.remoteClientHandler = remoteClientHandler;
    this.client = !remoteClientHandler ? new import_openai.default(__spreadValues({
      baseURL: "https://api.cerebras.ai/v1",
      apiKey: (clientOptions == null ? void 0 : clientOptions.apiKey) || process.env.CEREBRAS_API_KEY
    }, clientOptions)) : null;
    this.cache = cache;
    this.enableCaching = enableCaching;
    this.modelName = modelName;
    this.clientOptions = clientOptions;
  }
  createChatCompletion(_0) {
    return __async(this, arguments, function* ({
      options,
      retries,
      logger
    }) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      const optionsWithoutImage = __spreadValues({}, options);
      delete optionsWithoutImage.image;
      logger({
        category: "cerebras",
        message: "creating chat completion",
        level: 1,
        auxiliary: {
          options: {
            value: JSON.stringify(optionsWithoutImage),
            type: "object"
          }
        }
      });
      const cacheOptions = {
        model: this.modelName.split("cerebras-")[1],
        messages: options.messages,
        temperature: options.temperature,
        response_model: options.response_model,
        tools: options.tools,
        retries
      };
      if (this.enableCaching) {
        const cachedResponse = yield this.cache.get(
          cacheOptions,
          options.requestId
        );
        if (cachedResponse) {
          logger({
            category: "llm_cache",
            message: "LLM cache hit - returning cached response",
            level: 1,
            auxiliary: {
              cachedResponse: {
                value: JSON.stringify(cachedResponse),
                type: "object"
              },
              requestId: {
                value: options.requestId,
                type: "string"
              },
              cacheOptions: {
                value: JSON.stringify(cacheOptions),
                type: "object"
              }
            }
          });
          return cachedResponse;
        }
      }
      const formattedMessages = options.messages.map((msg) => {
        const baseMessage = {
          content: typeof msg.content === "string" ? msg.content : Array.isArray(msg.content) && msg.content.length > 0 && "text" in msg.content[0] ? msg.content[0].text : ""
        };
        if (msg.role === "system") {
          return __spreadProps(__spreadValues({}, baseMessage), { role: "system" });
        } else if (msg.role === "assistant") {
          return __spreadProps(__spreadValues({}, baseMessage), { role: "assistant" });
        } else {
          return __spreadProps(__spreadValues({}, baseMessage), { role: "user" });
        }
      });
      let tools = (_a = options.tools) == null ? void 0 : _a.map((tool) => ({
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          parameters: {
            type: "object",
            properties: tool.parameters.properties,
            required: tool.parameters.required
          }
        }
      }));
      if (options.response_model) {
        const jsonSchema = (0, import_zod_to_json_schema3.zodToJsonSchema)(options.response_model.schema);
        const schemaProperties = jsonSchema.properties || {};
        const schemaRequired = jsonSchema.required || [];
        const responseTool = {
          type: "function",
          function: {
            name: "print_extracted_data",
            description: "Prints the extracted data based on the provided schema.",
            parameters: {
              type: "object",
              properties: schemaProperties,
              required: schemaRequired
            }
          }
        };
        tools = tools ? [...tools, responseTool] : [responseTool];
      }
      try {
        const body = {
          model: this.modelName.split("cerebras-")[1],
          messages: [
            ...formattedMessages,
            // Add explicit instruction to return JSON if we have a response model
            ...options.response_model ? [
              {
                role: "system",
                content: `IMPORTANT: Your response must be valid JSON that matches this schema: ${JSON.stringify(options.response_model.schema)}`
              }
            ] : []
          ],
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens,
          tools,
          tool_choice: options.tool_choice || "auto"
        };
        let apiResponse;
        if (this.remoteClientHandler) {
          apiResponse = yield this.remoteClientHandler("openai", {
            clientOptions: __spreadValues({
              baseURL: "https://api.cerebras.ai/v1",
              apiKey: ((_b = this.clientOptions) == null ? void 0 : _b.apiKey) || process.env.CEREBRAS_API_KEY
            }, this.clientOptions),
            body
          });
        } else {
          apiResponse = yield this.client.chat.completions.create(body);
        }
        const response = {
          id: apiResponse.id,
          object: "chat.completion",
          created: Date.now(),
          model: this.modelName.split("cerebras-")[1],
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content: ((_d = (_c = apiResponse.choices[0]) == null ? void 0 : _c.message) == null ? void 0 : _d.content) || null,
                tool_calls: ((_f = (_e = apiResponse.choices[0]) == null ? void 0 : _e.message) == null ? void 0 : _f.tool_calls) || []
              },
              finish_reason: ((_g = apiResponse.choices[0]) == null ? void 0 : _g.finish_reason) || "stop"
            }
          ],
          usage: {
            prompt_tokens: ((_h = apiResponse.usage) == null ? void 0 : _h.prompt_tokens) || 0,
            completion_tokens: ((_i = apiResponse.usage) == null ? void 0 : _i.completion_tokens) || 0,
            total_tokens: ((_j = apiResponse.usage) == null ? void 0 : _j.total_tokens) || 0
          }
        };
        logger({
          category: "cerebras",
          message: "response",
          level: 1,
          auxiliary: {
            response: {
              value: JSON.stringify(response),
              type: "object"
            },
            requestId: {
              value: options.requestId,
              type: "string"
            }
          }
        });
        if (options.response_model) {
          const toolCall = (_m = (_l = (_k = response.choices[0]) == null ? void 0 : _k.message) == null ? void 0 : _l.tool_calls) == null ? void 0 : _m[0];
          if ((_n = toolCall == null ? void 0 : toolCall.function) == null ? void 0 : _n.arguments) {
            try {
              const result = JSON.parse(toolCall.function.arguments);
              if (this.enableCaching) {
                this.cache.set(cacheOptions, result, options.requestId);
              }
              return result;
            } catch (e) {
              logger({
                category: "cerebras",
                message: "failed to parse tool call arguments as JSON, retrying",
                level: 1,
                auxiliary: {
                  error: {
                    value: e.message,
                    type: "string"
                  }
                }
              });
            }
          }
          const content = (_p = (_o = response.choices[0]) == null ? void 0 : _o.message) == null ? void 0 : _p.content;
          if (content) {
            try {
              const jsonMatch = content.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const result = JSON.parse(jsonMatch[0]);
                if (this.enableCaching) {
                  this.cache.set(cacheOptions, result, options.requestId);
                }
                return result;
              }
            } catch (e) {
              logger({
                category: "cerebras",
                message: "failed to parse content as JSON",
                level: 1,
                auxiliary: {
                  error: {
                    value: e.message,
                    type: "string"
                  }
                }
              });
            }
          }
          if (!retries || retries < 5) {
            return this.createChatCompletion({
              options,
              logger,
              retries: (retries != null ? retries : 0) + 1
            });
          }
          throw new Error(
            "Create Chat Completion Failed: Could not extract valid JSON from response"
          );
        }
        if (this.enableCaching) {
          this.cache.set(cacheOptions, response, options.requestId);
        }
        return response;
      } catch (error) {
        logger({
          category: "cerebras",
          message: "error creating chat completion",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            requestId: {
              value: options.requestId,
              type: "string"
            }
          }
        });
        throw error;
      }
    });
  }
};

// lib/llm/GroqClient.ts
var import_openai2 = __toESM(require("openai"));
var import_zod_to_json_schema4 = require("zod-to-json-schema");
var GroqClient = class extends LLMClient {
  constructor({
    enableCaching = false,
    cache,
    modelName,
    clientOptions,
    userProvidedInstructions,
    remoteClientHandler
  }) {
    super(modelName, userProvidedInstructions);
    this.type = "groq";
    this.hasVision = false;
    this.remoteClientHandler = remoteClientHandler;
    this.client = !remoteClientHandler ? new import_openai2.default(__spreadValues({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: (clientOptions == null ? void 0 : clientOptions.apiKey) || process.env.GROQ_API_KEY
    }, clientOptions)) : null;
    this.cache = cache;
    this.enableCaching = enableCaching;
    this.modelName = modelName;
    this.clientOptions = clientOptions;
  }
  createChatCompletion(_0) {
    return __async(this, arguments, function* ({
      options,
      retries,
      logger
    }) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      const optionsWithoutImage = __spreadValues({}, options);
      delete optionsWithoutImage.image;
      logger({
        category: "groq",
        message: "creating chat completion",
        level: 1,
        auxiliary: {
          options: {
            value: JSON.stringify(optionsWithoutImage),
            type: "object"
          }
        }
      });
      const cacheOptions = {
        model: this.modelName.split("groq-")[1],
        messages: options.messages,
        temperature: options.temperature,
        response_model: options.response_model,
        tools: options.tools,
        retries
      };
      if (this.enableCaching) {
        const cachedResponse = yield this.cache.get(
          cacheOptions,
          options.requestId
        );
        if (cachedResponse) {
          logger({
            category: "llm_cache",
            message: "LLM cache hit - returning cached response",
            level: 1,
            auxiliary: {
              cachedResponse: {
                value: JSON.stringify(cachedResponse),
                type: "object"
              },
              requestId: {
                value: options.requestId,
                type: "string"
              },
              cacheOptions: {
                value: JSON.stringify(cacheOptions),
                type: "object"
              }
            }
          });
          return cachedResponse;
        }
      }
      const formattedMessages = options.messages.map((msg) => {
        const baseMessage = {
          content: typeof msg.content === "string" ? msg.content : Array.isArray(msg.content) && msg.content.length > 0 && "text" in msg.content[0] ? msg.content[0].text : ""
        };
        if (msg.role === "system") {
          return __spreadProps(__spreadValues({}, baseMessage), { role: "system" });
        } else if (msg.role === "assistant") {
          return __spreadProps(__spreadValues({}, baseMessage), { role: "assistant" });
        } else {
          return __spreadProps(__spreadValues({}, baseMessage), { role: "user" });
        }
      });
      let tools = (_a = options.tools) == null ? void 0 : _a.map((tool) => ({
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          parameters: {
            type: "object",
            properties: tool.parameters.properties,
            required: tool.parameters.required
          }
        }
      }));
      if (options.response_model) {
        const jsonSchema = (0, import_zod_to_json_schema4.zodToJsonSchema)(options.response_model.schema);
        const schemaProperties = jsonSchema.properties || {};
        const schemaRequired = jsonSchema.required || [];
        const responseTool = {
          type: "function",
          function: {
            name: "print_extracted_data",
            description: "Prints the extracted data based on the provided schema.",
            parameters: {
              type: "object",
              properties: schemaProperties,
              required: schemaRequired
            }
          }
        };
        tools = tools ? [...tools, responseTool] : [responseTool];
      }
      try {
        const body = {
          model: this.modelName.split("groq-")[1],
          messages: [
            ...formattedMessages,
            // Add explicit instruction to return JSON if we have a response model
            ...options.response_model ? [
              {
                role: "system",
                content: `IMPORTANT: Your response must be valid JSON that matches this schema: ${JSON.stringify(options.response_model.schema)}`
              }
            ] : []
          ],
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens,
          tools,
          tool_choice: options.tool_choice || "auto"
        };
        let apiResponse;
        if (this.remoteClientHandler) {
          apiResponse = yield this.remoteClientHandler("openai", {
            clientOptions: __spreadValues({
              baseURL: "https://api.groq.com/openai/v1",
              apiKey: ((_b = this.clientOptions) == null ? void 0 : _b.apiKey) || process.env.GROQ_API_KEY
            }, this.clientOptions),
            body
          });
        } else {
          apiResponse = yield this.client.chat.completions.create(body);
        }
        const response = {
          id: apiResponse.id,
          object: "chat.completion",
          created: Date.now(),
          model: this.modelName.split("groq-")[1],
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content: ((_d = (_c = apiResponse.choices[0]) == null ? void 0 : _c.message) == null ? void 0 : _d.content) || null,
                tool_calls: ((_f = (_e = apiResponse.choices[0]) == null ? void 0 : _e.message) == null ? void 0 : _f.tool_calls) || []
              },
              finish_reason: ((_g = apiResponse.choices[0]) == null ? void 0 : _g.finish_reason) || "stop"
            }
          ],
          usage: {
            prompt_tokens: ((_h = apiResponse.usage) == null ? void 0 : _h.prompt_tokens) || 0,
            completion_tokens: ((_i = apiResponse.usage) == null ? void 0 : _i.completion_tokens) || 0,
            total_tokens: ((_j = apiResponse.usage) == null ? void 0 : _j.total_tokens) || 0
          }
        };
        logger({
          category: "groq",
          message: "response",
          level: 1,
          auxiliary: {
            response: {
              value: JSON.stringify(response),
              type: "object"
            },
            requestId: {
              value: options.requestId,
              type: "string"
            }
          }
        });
        if (options.response_model) {
          const toolCall = (_m = (_l = (_k = response.choices[0]) == null ? void 0 : _k.message) == null ? void 0 : _l.tool_calls) == null ? void 0 : _m[0];
          if ((_n = toolCall == null ? void 0 : toolCall.function) == null ? void 0 : _n.arguments) {
            try {
              const result = JSON.parse(toolCall.function.arguments);
              if (this.enableCaching) {
                this.cache.set(cacheOptions, result, options.requestId);
              }
              return result;
            } catch (e) {
              logger({
                category: "groq",
                message: "failed to parse tool call arguments as JSON, retrying",
                level: 1,
                auxiliary: {
                  error: {
                    value: e.message,
                    type: "string"
                  }
                }
              });
            }
          }
          const content = (_p = (_o = response.choices[0]) == null ? void 0 : _o.message) == null ? void 0 : _p.content;
          if (content) {
            try {
              const jsonMatch = content.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const result = JSON.parse(jsonMatch[0]);
                if (this.enableCaching) {
                  this.cache.set(cacheOptions, result, options.requestId);
                }
                return result;
              }
            } catch (e) {
              logger({
                category: "groq",
                message: "failed to parse content as JSON",
                level: 1,
                auxiliary: {
                  error: {
                    value: e.message,
                    type: "string"
                  }
                }
              });
            }
          }
          if (!retries || retries < 5) {
            return this.createChatCompletion({
              options,
              logger,
              retries: (retries != null ? retries : 0) + 1
            });
          }
          throw new Error(
            "Create Chat Completion Failed: Could not extract valid JSON from response"
          );
        }
        if (this.enableCaching) {
          this.cache.set(cacheOptions, response, options.requestId);
        }
        return response;
      } catch (error) {
        logger({
          category: "groq",
          message: "error creating chat completion",
          level: 1,
          auxiliary: {
            error: {
              value: error.message,
              type: "string"
            },
            requestId: {
              value: options.requestId,
              type: "string"
            }
          }
        });
        throw error;
      }
    });
  }
};

// lib/llm/OpenAIClient.ts
var import_openai3 = __toESM(require("openai"));
var import_zod3 = require("openai/helpers/zod");
var import_zod_to_json_schema5 = __toESM(require("zod-to-json-schema"));
var OpenAIClient = class extends LLMClient {
  constructor({
    enableCaching = false,
    cache,
    modelName,
    clientOptions,
    remoteClientHandler
  }) {
    super(modelName);
    this.type = "openai";
    this.clientOptions = clientOptions;
    this.remoteClientHandler = remoteClientHandler;
    this.client = !remoteClientHandler ? new import_openai3.default(clientOptions) : null;
    this.cache = cache;
    this.enableCaching = enableCaching;
    this.modelName = modelName;
  }
  createChatCompletion(_0) {
    return __async(this, arguments, function* ({
      options: optionsInitial,
      logger,
      retries = 3
    }) {
      var _a, _b, _e;
      let options = optionsInitial;
      let isToolsOverridedForO1 = false;
      if (this.modelName.startsWith("o1") || this.modelName.startsWith("o3")) {
        let {
          tool_choice,
          top_p,
          frequency_penalty,
          presence_penalty,
          temperature
        } = options;
        _a = options, {
          tool_choice,
          top_p,
          frequency_penalty,
          presence_penalty,
          temperature
        } = _a, options = __objRest(_a, [
          "tool_choice",
          "top_p",
          "frequency_penalty",
          "presence_penalty",
          "temperature"
        ]);
        options.messages = options.messages.map((message) => __spreadProps(__spreadValues({}, message), {
          role: "user"
        }));
        if (options.tools && options.response_model) {
          throw new Error(
            "Cannot use both tool and response_model for o1 models"
          );
        }
        if (options.tools) {
          let { tools } = options;
          _b = options, { tools } = _b, options = __objRest(_b, ["tools"]);
          isToolsOverridedForO1 = true;
          options.messages.push({
            role: "user",
            content: `You have the following tools available to you:
${JSON.stringify(
              tools
            )}

          Respond with the following zod schema format to use a method: {
            "name": "<tool_name>",
            "arguments": <tool_args>
          }
          
          Do not include any other text or formattings like \`\`\` in your response. Just the JSON object.`
          });
        }
      }
      if (options.temperature && (this.modelName.startsWith("o1") || this.modelName.startsWith("o3"))) {
        throw new Error("Temperature is not supported for o1 models");
      }
      const _c = options, { image, requestId } = _c, optionsWithoutImageAndRequestId = __objRest(_c, ["image", "requestId"]);
      logger({
        category: "openai",
        message: "creating chat completion",
        level: 1,
        auxiliary: {
          options: {
            value: JSON.stringify(__spreadProps(__spreadValues({}, optionsWithoutImageAndRequestId), {
              requestId
            })),
            type: "object"
          },
          modelName: {
            value: this.modelName,
            type: "string"
          }
        }
      });
      const cacheOptions = {
        model: this.modelName,
        messages: options.messages,
        temperature: options.temperature,
        top_p: options.top_p,
        frequency_penalty: options.frequency_penalty,
        presence_penalty: options.presence_penalty,
        image,
        response_model: options.response_model
      };
      if (this.enableCaching) {
        const cachedResponse = yield this.cache.get(
          cacheOptions,
          options.requestId
        );
        if (cachedResponse) {
          logger({
            category: "llm_cache",
            message: "LLM cache hit - returning cached response",
            level: 1,
            auxiliary: {
              requestId: {
                value: options.requestId,
                type: "string"
              },
              cachedResponse: {
                value: JSON.stringify(cachedResponse),
                type: "object"
              }
            }
          });
          return cachedResponse;
        } else {
          logger({
            category: "llm_cache",
            message: "LLM cache miss - no cached response found",
            level: 1,
            auxiliary: {
              requestId: {
                value: options.requestId,
                type: "string"
              }
            }
          });
        }
      }
      if (options.image) {
        const screenshotMessage = {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${options.image.buffer.toString("base64")}`
              }
            },
            ...options.image.description ? [{ type: "text", text: options.image.description }] : []
          ]
        };
        options.messages.push(screenshotMessage);
      }
      let responseFormat = void 0;
      if (options.response_model) {
        if (this.modelName.startsWith("o1") || this.modelName.startsWith("o3")) {
          try {
            const parsedSchema = JSON.stringify(
              (0, import_zod_to_json_schema5.default)(options.response_model.schema)
            );
            options.messages.push({
              role: "user",
              content: `Respond in this zod schema format:
${parsedSchema}


          Do not include any other text, formatting or markdown in your output. Do not include \`\`\` or \`\`\`json in your response. Only the JSON object itself.`
            });
          } catch (error) {
            logger({
              category: "openai",
              message: "Failed to parse response model schema",
              level: 0
            });
            if (retries > 0) {
              return this.createChatCompletion({
                options,
                logger,
                retries: retries - 1
              });
            }
            throw error;
          }
        } else {
          responseFormat = (0, import_zod3.zodResponseFormat)(
            options.response_model.schema,
            options.response_model.name
          );
        }
      }
      const _d = __spreadProps(__spreadValues({}, optionsWithoutImageAndRequestId), {
        model: this.modelName
      }), { response_model } = _d, openAiOptions = __objRest(_d, ["response_model"]);
      logger({
        category: "openai",
        message: "creating chat completion",
        level: 1,
        auxiliary: {
          openAiOptions: {
            value: JSON.stringify(openAiOptions),
            type: "object"
          }
        }
      });
      const formattedMessages = options.messages.map((message) => {
        if (Array.isArray(message.content)) {
          const contentParts = message.content.map((content) => {
            if ("image_url" in content) {
              const imageContent = {
                image_url: {
                  url: content.image_url.url
                },
                type: "image_url"
              };
              return imageContent;
            } else {
              const textContent = {
                text: content.text,
                type: "text"
              };
              return textContent;
            }
          });
          if (message.role === "system") {
            const formattedMessage2 = __spreadProps(__spreadValues({}, message), {
              role: "system",
              content: contentParts.filter(
                (content) => content.type === "text"
              )
            });
            return formattedMessage2;
          } else if (message.role === "user") {
            const formattedMessage2 = __spreadProps(__spreadValues({}, message), {
              role: "user",
              content: contentParts
            });
            return formattedMessage2;
          } else {
            const formattedMessage2 = __spreadProps(__spreadValues({}, message), {
              role: "assistant",
              content: contentParts.filter(
                (content) => content.type === "text"
              )
            });
            return formattedMessage2;
          }
        }
        const formattedMessage = {
          role: "user",
          content: message.content
        };
        return formattedMessage;
      });
      const body = __spreadProps(__spreadValues({}, openAiOptions), {
        model: this.modelName,
        messages: formattedMessages,
        response_format: responseFormat,
        stream: false,
        tools: (_e = options.tools) == null ? void 0 : _e.map((tool) => ({
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters
          },
          type: "function"
        }))
      });
      let response;
      if (this.remoteClientHandler) {
        response = yield this.remoteClientHandler("openai", {
          clientOptions: this.clientOptions,
          body
        });
      } else {
        response = yield this.client.chat.completions.create(body);
      }
      if (isToolsOverridedForO1) {
        try {
          const parsedContent = JSON.parse(response.choices[0].message.content);
          response.choices[0].message.tool_calls = [
            {
              function: {
                name: parsedContent["name"],
                arguments: JSON.stringify(parsedContent["arguments"])
              },
              type: "function",
              id: "-1"
            }
          ];
          response.choices[0].message.content = null;
        } catch (error) {
          logger({
            category: "openai",
            message: "Failed to parse tool call response",
            level: 0,
            auxiliary: {
              error: {
                value: error.message,
                type: "string"
              },
              content: {
                value: response.choices[0].message.content,
                type: "string"
              }
            }
          });
          if (retries > 0) {
            return this.createChatCompletion({
              options,
              logger,
              retries: retries - 1
            });
          }
          throw error;
        }
      }
      logger({
        category: "openai",
        message: "response",
        level: 1,
        auxiliary: {
          response: {
            value: JSON.stringify(response),
            type: "object"
          },
          requestId: {
            value: requestId,
            type: "string"
          }
        }
      });
      if (options.response_model) {
        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        if (!validateZodSchema(options.response_model.schema, parsedData)) {
          if (retries > 0) {
            return this.createChatCompletion({
              options,
              logger,
              retries: retries - 1
            });
          }
          throw new Error("Invalid response schema");
        }
        if (this.enableCaching) {
          this.cache.set(
            cacheOptions,
            __spreadValues({}, parsedData),
            options.requestId
          );
        }
        return {
          data: parsedData,
          usage: response.usage
        };
      }
      if (this.enableCaching) {
        logger({
          category: "llm_cache",
          message: "caching response",
          level: 1,
          auxiliary: {
            requestId: {
              value: options.requestId,
              type: "string"
            },
            cacheOptions: {
              value: JSON.stringify(cacheOptions),
              type: "object"
            },
            response: {
              value: JSON.stringify(response),
              type: "object"
            }
          }
        });
        this.cache.set(cacheOptions, response, options.requestId);
      }
      return response;
    });
  }
};

// lib/llm/LLMProvider.ts
var modelToProviderMap = {
  "gpt-4o": "openai",
  "gpt-4o-mini": "openai",
  "gpt-4o-2024-08-06": "openai",
  "gpt-4.5-preview": "openai",
  "o1-mini": "openai",
  "o1-preview": "openai",
  "o3-mini": "openai",
  "claude-3-5-sonnet-latest": "anthropic",
  "claude-3-5-sonnet-20240620": "anthropic",
  "claude-3-5-sonnet-20241022": "anthropic",
  "claude-3-7-sonnet-20250219": "anthropic",
  "claude-3-7-sonnet-latest": "anthropic",
  "cerebras-llama-3.3-70b": "cerebras",
  "cerebras-llama-3.1-8b": "cerebras",
  "groq-llama-3.3-70b-versatile": "groq",
  "groq-llama-3.3-70b-specdec": "groq"
};
var LLMProvider = class {
  constructor(logger, enableCaching) {
    this.logger = logger;
    this.enableCaching = enableCaching;
    this.cache = enableCaching ? new LLMCache(logger) : void 0;
  }
  cleanRequestCache(requestId) {
    if (!this.enableCaching) {
      return;
    }
    this.logger({
      category: "llm_cache",
      message: "cleaning up cache",
      level: 1,
      auxiliary: {
        requestId: {
          value: requestId,
          type: "string"
        }
      }
    });
    this.cache.deleteCacheForRequestId(requestId);
  }
  getClient(modelName, clientOptions, remoteClientHandler) {
    const provider = modelToProviderMap[modelName];
    if (!provider) {
      throw new Error(`Unsupported model: ${modelName}`);
    }
    switch (provider) {
      case "openai":
        return new OpenAIClient({
          logger: this.logger,
          enableCaching: this.enableCaching,
          cache: this.cache,
          modelName,
          clientOptions,
          remoteClientHandler
        });
      case "anthropic":
        return new AnthropicClient({
          logger: this.logger,
          enableCaching: this.enableCaching,
          cache: this.cache,
          modelName,
          clientOptions,
          remoteClientHandler
        });
      case "cerebras":
        return new CerebrasClient({
          logger: this.logger,
          enableCaching: this.enableCaching,
          cache: this.cache,
          modelName,
          clientOptions,
          remoteClientHandler
        });
      case "groq":
        return new GroqClient({
          logger: this.logger,
          enableCaching: this.enableCaching,
          cache: this.cache,
          modelName,
          clientOptions,
          remoteClientHandler
        });
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
  static getModelProvider(modelName) {
    const provider = modelToProviderMap[modelName];
    return provider;
  }
};

// lib/agent/OpenAICUAClient.ts
var import_openai4 = __toESM(require("openai"));

// lib/agent/AgentClient.ts
var AgentClient = class {
  constructor(type, modelName, userProvidedInstructions) {
    this.type = type;
    this.modelName = modelName;
    this.userProvidedInstructions = userProvidedInstructions;
    this.clientOptions = {};
  }
};

// lib/agent/OpenAICUAClient.ts
var OpenAICUAClient = class extends AgentClient {
  constructor(type, modelName, userProvidedInstructions, clientOptions, remoteAgentClientHandler) {
    super(type, modelName, userProvidedInstructions);
    this.currentViewport = { width: 1024, height: 768 };
    this.reasoningItems = /* @__PURE__ */ new Map();
    this.environment = "browser";
    this.apiKey = (clientOptions == null ? void 0 : clientOptions.apiKey) || process.env.OPENAI_API_KEY || "";
    this.organization = (clientOptions == null ? void 0 : clientOptions.organization) || process.env.OPENAI_ORG;
    if ((clientOptions == null ? void 0 : clientOptions.environment) && typeof clientOptions.environment === "string") {
      this.environment = clientOptions.environment;
    }
    this.clientOptions = {
      apiKey: this.apiKey
    };
    this.remoteAgentClientHandler = remoteAgentClientHandler;
    this.client = !remoteAgentClientHandler ? new import_openai4.default(this.clientOptions) : null;
  }
  setViewport(width, height) {
    this.currentViewport = { width, height };
  }
  setCurrentUrl(url) {
    this.currentUrl = url;
  }
  setScreenshotProvider(provider) {
    this.screenshotProvider = provider;
  }
  setActionHandler(handler) {
    this.actionHandler = handler;
  }
  /**
   * Execute a task with the OpenAI CUA
   * This is the main entry point for the agent
   * @implements AgentClient.execute
   */
  execute(executionOptions) {
    return __async(this, null, function* () {
      const { options, logger } = executionOptions;
      const { instruction } = options;
      const maxSteps = options.maxSteps || 10;
      let currentStep = 0;
      let completed = false;
      const actions = [];
      const messageList = [];
      let finalMessage = "";
      this.reasoningItems.clear();
      let inputItems = this.createInitialInputItems(instruction);
      let previousResponseId = void 0;
      try {
        while (!completed && currentStep < maxSteps) {
          logger({
            category: "agent",
            message: `Executing step ${currentStep + 1}/${maxSteps}`,
            level: 2
          });
          const result = yield this.executeStep(
            inputItems,
            previousResponseId,
            logger
          );
          actions.push(...result.actions);
          completed = result.completed;
          previousResponseId = result.responseId;
          if (!completed) {
            inputItems = result.nextInputItems;
          }
          if (result.message) {
            messageList.push(result.message);
            finalMessage = result.message;
          }
          currentStep++;
        }
        return {
          success: completed,
          actions,
          message: finalMessage,
          completed
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger({
          category: "agent",
          message: `Error executing agent task: ${errorMessage}`,
          level: 0
        });
        return {
          success: false,
          actions,
          message: `Failed to execute task: ${errorMessage}`,
          completed: false
        };
      }
    });
  }
  /**
   * Execute a single step of the agent
   * This coordinates the flow: Request → Get Action → Execute Action
   */
  executeStep(inputItems, previousResponseId, logger) {
    return __async(this, null, function* () {
      try {
        const result = yield this.getAction(inputItems, previousResponseId);
        const output = result.output;
        const responseId = result.responseId;
        for (const item of output) {
          if (item.type === "reasoning") {
            this.reasoningItems.set(item.id, item);
          }
        }
        const stepActions = [];
        for (const item of output) {
          if (item.type === "computer_call" && this.isComputerCallItem(item)) {
            const action = this.convertComputerCallToAction(item);
            if (action) {
              stepActions.push(action);
            }
          } else if (item.type === "function_call" && this.isFunctionCallItem(item)) {
            const action = this.convertFunctionCallToAction(item);
            if (action) {
              stepActions.push(action);
            }
          }
        }
        let message = "";
        for (const item of output) {
          if (item.type === "message") {
            if (item.content && Array.isArray(item.content)) {
              for (const content of item.content) {
                if (content.type === "output_text" && content.text) {
                  message += content.text + "\n";
                }
              }
            }
          }
        }
        const nextInputItems = yield this.takeAction(output, logger);
        const completed = output.length === 0 || output.every(
          (item) => item.type === "message" || item.type === "reasoning"
        );
        return {
          actions: stepActions,
          message: message.trim(),
          completed,
          nextInputItems,
          responseId
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger({
          category: "agent",
          message: `Error executing step: ${errorMessage}`,
          level: 0
        });
        throw error;
      }
    });
  }
  isComputerCallItem(item) {
    return item.type === "computer_call" && "call_id" in item && "action" in item && typeof item.action === "object";
  }
  isFunctionCallItem(item) {
    return item.type === "function_call" && "call_id" in item && "name" in item && "arguments" in item;
  }
  createInitialInputItems(instruction) {
    return [
      {
        role: "system",
        content: this.userProvidedInstructions
      },
      {
        role: "user",
        content: instruction
      }
    ];
  }
  getAction(inputItems, previousResponseId) {
    return __async(this, null, function* () {
      try {
        const requestParams = {
          model: this.modelName,
          tools: [
            {
              type: "computer_use_preview",
              display_width: this.currentViewport.width,
              display_height: this.currentViewport.height,
              environment: this.environment
            }
          ],
          input: inputItems,
          truncation: "auto"
        };
        if (previousResponseId) {
          requestParams.previous_response_id = previousResponseId;
        }
        let response;
        if (this.remoteAgentClientHandler) {
          response = yield this.remoteAgentClientHandler("openai", {
            clientOptions: this.clientOptions,
            body: requestParams
          });
        } else {
          response = yield this.client.responses.create(requestParams);
        }
        this.lastResponseId = response.id;
        return {
          output: response.output,
          responseId: response.id
        };
      } catch (error) {
        console.error("Error getting action from OpenAI:", error);
        throw error;
      }
    });
  }
  takeAction(output, logger) {
    return __async(this, null, function* () {
      const nextInputItems = [];
      for (const item of output) {
        if (item.type === "computer_call" && this.isComputerCallItem(item)) {
          try {
            const action = this.convertComputerCallToAction(item);
            if (action && this.actionHandler) {
              yield this.actionHandler(action);
            }
            const screenshot = yield this.captureScreenshot();
            const outputItem = {
              type: "computer_call_output",
              call_id: item.call_id,
              output: {
                type: "input_image",
                image_url: screenshot
              }
            };
            if (this.currentUrl) {
              const computerCallOutput = outputItem;
              computerCallOutput.output.current_url = this.currentUrl;
            }
            if (item.pending_safety_checks && item.pending_safety_checks.length > 0) {
              const computerCallOutput = outputItem;
              computerCallOutput.acknowledged_safety_checks = item.pending_safety_checks;
            }
            nextInputItems.push(outputItem);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            logger({
              category: "agent",
              message: `Error executing computer call: ${errorMessage}`,
              level: 0
            });
            try {
              const screenshot = yield this.captureScreenshot();
              const errorOutputItem = {
                type: "computer_call_output",
                call_id: item.call_id,
                output: {
                  type: "input_image",
                  image_url: screenshot,
                  error: errorMessage
                }
              };
              if (this.currentUrl) {
                const computerCallOutput = errorOutputItem;
                computerCallOutput.output.current_url = this.currentUrl;
              }
              if (item.pending_safety_checks && item.pending_safety_checks.length > 0) {
                const computerCallOutput = errorOutputItem;
                computerCallOutput.acknowledged_safety_checks = item.pending_safety_checks;
              }
              nextInputItems.push(errorOutputItem);
            } catch (screenshotError) {
              logger({
                category: "agent",
                message: `Error capturing screenshot: ${String(screenshotError)}`,
                level: 0
              });
              nextInputItems.push({
                type: "computer_call_output",
                call_id: item.call_id,
                output: `Error: ${errorMessage}`
              });
            }
          }
        } else if (item.type === "function_call" && this.isFunctionCallItem(item)) {
          try {
            const action = this.convertFunctionCallToAction(item);
            if (action && this.actionHandler) {
              yield this.actionHandler(action);
            }
            nextInputItems.push({
              type: "function_call_output",
              call_id: item.call_id,
              output: "success"
            });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            logger({
              category: "agent",
              message: `Error executing function call: ${errorMessage}`,
              level: 0
            });
            nextInputItems.push({
              type: "function_call_output",
              call_id: item.call_id,
              output: `Error: ${errorMessage}`
            });
          }
        }
      }
      return nextInputItems;
    });
  }
  convertComputerCallToAction(call) {
    const { action } = call;
    return __spreadValues({
      type: action.type
    }, action);
  }
  convertFunctionCallToAction(call) {
    try {
      const args = JSON.parse(call.arguments);
      return {
        type: call.name,
        params: args
      };
    } catch (error) {
      console.error("Error parsing function call arguments:", error);
      return null;
    }
  }
  captureScreenshot(options) {
    return __async(this, null, function* () {
      if (options == null ? void 0 : options.base64Image) {
        return `data:image/png;base64,${options.base64Image}`;
      }
      if (this.screenshotProvider) {
        try {
          const base64Image = yield this.screenshotProvider();
          return `data:image/png;base64,${base64Image}`;
        } catch (error) {
          console.error("Error capturing screenshot:", error);
          throw error;
        }
      }
      throw new Error("Screenshot provider not available");
    });
  }
};

// lib/agent/AnthropicCUAClient.ts
var import_sdk3 = __toESM(require("@anthropic-ai/sdk"));
var AnthropicCUAClient = class extends AgentClient {
  constructor(type, modelName, userProvidedInstructions, clientOptions, remoteAgentClientHandler) {
    super(type, modelName, userProvidedInstructions);
    this.currentViewport = { width: 1024, height: 768 };
    this.thinkingBudget = null;
    this.apiKey = (clientOptions == null ? void 0 : clientOptions.apiKey) || process.env.ANTHROPIC_API_KEY || "";
    this.baseURL = (clientOptions == null ? void 0 : clientOptions.baseURL) || void 0;
    if ((clientOptions == null ? void 0 : clientOptions.thinkingBudget) && typeof clientOptions.thinkingBudget === "number") {
      this.thinkingBudget = clientOptions.thinkingBudget;
    }
    this.clientOptions = {
      apiKey: this.apiKey
    };
    if (this.baseURL) {
      this.clientOptions.baseUrl = this.baseURL;
    }
    this.remoteAgentClientHandler = remoteAgentClientHandler;
    this.client = !remoteAgentClientHandler ? new import_sdk3.default(this.clientOptions) : null;
  }
  setViewport(width, height) {
    this.currentViewport = { width, height };
  }
  setCurrentUrl(url) {
    this.currentUrl = url;
  }
  setScreenshotProvider(provider) {
    this.screenshotProvider = provider;
  }
  setActionHandler(handler) {
    this.actionHandler = handler;
  }
  /**
   * Execute a task with the Anthropic CUA
   * This is the main entry point for the agent
   * @implements AgentClient.execute
   */
  execute(executionOptions) {
    return __async(this, null, function* () {
      const { options, logger } = executionOptions;
      const { instruction } = options;
      const maxSteps = options.maxSteps || 10;
      const waitBetweenSteps = options.waitBetweenSteps || 0;
      let currentStep = 0;
      let completed = false;
      const actions = [];
      const messageList = [];
      let finalMessage = "";
      let inputItems = this.createInitialInputItems(instruction);
      logger({
        category: "agent",
        message: `Starting Anthropic agent execution with instruction: ${instruction}`,
        level: 1
      });
      try {
        while (!completed && currentStep < maxSteps) {
          logger({
            category: "agent",
            message: `Executing step ${currentStep + 1}/${maxSteps}`,
            level: 2
          });
          const result = yield this.executeStep(inputItems, logger);
          if (result.actions.length > 0) {
            logger({
              category: "agent",
              message: `Step ${currentStep + 1} performed ${result.actions.length} actions`,
              level: 2
            });
            actions.push(...result.actions);
          }
          completed = result.completed;
          if (!completed) {
            inputItems = result.nextInputItems;
          }
          if (result.message) {
            messageList.push(result.message);
            finalMessage = result.message;
          }
          yield new Promise((resolve) => setTimeout(resolve, waitBetweenSteps));
          currentStep++;
        }
        logger({
          category: "agent",
          message: `Anthropic agent execution completed: ${completed}, with ${actions.length} total actions performed`,
          level: 1
        });
        return {
          success: completed,
          actions,
          message: finalMessage,
          completed
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger({
          category: "agent",
          message: `Error executing agent task: ${errorMessage}`,
          level: 0
        });
        return {
          success: false,
          actions,
          message: `Failed to execute task: ${errorMessage}`,
          completed: false
        };
      }
    });
  }
  executeStep(inputItems, logger) {
    return __async(this, null, function* () {
      try {
        const result = yield this.getAction(inputItems);
        const content = result.content;
        logger({
          category: "agent",
          message: `Received response with ${content.length} content blocks`,
          level: 2
        });
        const stepActions = [];
        const toolUseItems = [];
        let message = "";
        for (const block of content) {
          console.log("Processing block:", JSON.stringify(block, null, 2));
          logger({
            category: "agent",
            message: `Processing block type: ${block.type}, id: ${block.id || "unknown"}`,
            level: 2
          });
          if (block.type === "tool_use") {
            logger({
              category: "agent",
              message: `Found tool_use block: ${JSON.stringify(block)}`,
              level: 2
            });
            const toolUseItem = block;
            toolUseItems.push(toolUseItem);
            logger({
              category: "agent",
              message: `Added tool_use item: ${toolUseItem.name}, action: ${JSON.stringify(toolUseItem.input)}`,
              level: 2
            });
            const action = this.convertToolUseToAction(toolUseItem);
            if (action) {
              logger({
                category: "agent",
                message: `Created action from tool_use: ${toolUseItem.name}, action: ${action.type}`,
                level: 2
              });
              stepActions.push(action);
            }
          } else if (block.type === "text") {
            const textBlock = block;
            message += textBlock.text + "\n";
            logger({
              category: "agent",
              message: `Found text block: ${textBlock.text.substring(0, 50)}...`,
              level: 2
            });
          } else {
            logger({
              category: "agent",
              message: `Found unknown block type: ${block.type}`,
              level: 2
            });
          }
        }
        if (this.actionHandler && stepActions.length > 0) {
          for (const action of stepActions) {
            try {
              logger({
                category: "agent",
                message: `Executing action: ${action.type}`,
                level: 1
              });
              yield this.actionHandler(action);
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              logger({
                category: "agent",
                message: `Error executing action ${action.type}: ${errorMessage}`,
                level: 0
              });
            }
          }
        }
        const assistantMessage = {
          role: "assistant",
          content
        };
        const nextInputItems = [...inputItems];
        nextInputItems.push(assistantMessage);
        if (toolUseItems.length > 0) {
          const toolResults = yield this.takeAction(toolUseItems, logger);
          if (toolResults.length > 0) {
            const userToolResultsMessage = {
              role: "user",
              content: toolResults
            };
            nextInputItems.push(userToolResultsMessage);
          }
        }
        const completed = toolUseItems.length === 0;
        logger({
          category: "agent",
          message: `Step processed ${toolUseItems.length} tool use items, completed: ${completed}`,
          level: 2
        });
        return {
          actions: stepActions,
          message: message.trim(),
          completed,
          nextInputItems
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger({
          category: "agent",
          message: `Error executing step: ${errorMessage}`,
          level: 0
        });
        throw error;
      }
    });
  }
  createInitialInputItems(instruction) {
    return [
      {
        role: "system",
        content: this.userProvidedInstructions
      },
      {
        role: "user",
        content: instruction
      }
    ];
  }
  getAction(inputItems) {
    return __async(this, null, function* () {
      try {
        const messages = [];
        for (const item of inputItems) {
          if ("role" in item) {
            if (item.role !== "system") {
              messages.push(item);
            }
          }
        }
        const thinking = this.thinkingBudget ? { type: "enabled", budget_tokens: this.thinkingBudget } : void 0;
        const modelToolMap = {
          "claude-3-7-sonnet-20250219": {
            type: "computer_20250124",
            betas: ["computer-use-2025-01-24"]
          },
          "claude-3-5-sonnet-20241022": {
            type: "computer_20241022",
            betas: ["computer-use-2024-10-22"]
          }
        };
        const requestParams = {
          model: this.modelName,
          max_tokens: 4096,
          messages,
          tools: [
            {
              // type: "computer_20250124", // Use the latest version for Claude 3.7 Sonnet
              type: modelToolMap[this.modelName].type,
              name: "computer",
              display_width_px: this.currentViewport.width,
              display_height_px: this.currentViewport.height,
              display_number: 1
            }
          ],
          // betas: ["computer-use-2025-01-24"],
          betas: modelToolMap[this.modelName].betas
        };
        if (this.userProvidedInstructions) {
          requestParams.system = this.userProvidedInstructions;
        }
        if (thinking) {
          requestParams.thinking = thinking;
        }
        if (messages.length > 0) {
          const firstMessage = messages[0];
          const contentPreview = typeof firstMessage.content === "string" ? firstMessage.content.substring(0, 50) : "complex content";
          console.log(
            `Sending request to Anthropic with ${messages.length} messages and ${messages.length > 0 ? `first message role: ${messages[0].role}, content: ${contentPreview}...` : "no messages"}`
          );
        }
        let response;
        if (this.remoteAgentClientHandler) {
          response = yield this.remoteAgentClientHandler("anthropic", {
            clientOptions: this.clientOptions,
            body: requestParams
          });
        } else {
          response = yield this.client.beta.messages.create(requestParams);
        }
        this.lastMessageId = response.id;
        return {
          // Cast the response content to our internal type
          content: response.content,
          id: response.id
        };
      } catch (error) {
        console.error("Error getting action from Anthropic:", error);
        throw error;
      }
    });
  }
  takeAction(toolUseItems, logger) {
    return __async(this, null, function* () {
      const nextInputItems = [];
      logger({
        category: "agent",
        message: `Taking action on ${toolUseItems.length} tool use items`,
        level: 2
      });
      for (const item of toolUseItems) {
        try {
          logger({
            category: "agent",
            message: `Processing tool use: ${item.name}, id: ${item.id}, action: ${JSON.stringify(item.input)}`,
            level: 2
          });
          if (item.name === "computer") {
            const action = item.input.action;
            logger({
              category: "agent",
              message: `Computer action type: ${action}`,
              level: 2
            });
            const screenshot = yield this.captureScreenshot();
            logger({
              category: "agent",
              message: `Screenshot captured, length: ${screenshot.length}`,
              level: 2
            });
            const imageContent = [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/png",
                  data: screenshot.replace(/^data:image\/png;base64,/, "")
                }
              }
            ];
            if (this.currentUrl) {
              nextInputItems.push({
                type: "tool_result",
                tool_use_id: item.id,
                content: [
                  ...imageContent,
                  {
                    type: "text",
                    text: `Current URL: ${this.currentUrl}`
                  }
                ]
              });
            } else {
              nextInputItems.push({
                type: "tool_result",
                tool_use_id: item.id,
                content: imageContent
              });
            }
            logger({
              category: "agent",
              message: `Added computer tool result for tool_use_id: ${item.id}`,
              level: 2
            });
          } else {
            nextInputItems.push({
              type: "tool_result",
              tool_use_id: item.id,
              content: "Tool executed successfully"
            });
            logger({
              category: "agent",
              message: `Added generic tool result for tool ${item.name}, tool_use_id: ${item.id}`,
              level: 2
            });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          logger({
            category: "agent",
            message: `Error executing tool use: ${errorMessage}`,
            level: 0
          });
          try {
            if (item.name === "computer") {
              const screenshot = yield this.captureScreenshot();
              nextInputItems.push({
                type: "tool_result",
                tool_use_id: item.id,
                content: [
                  {
                    type: "image",
                    source: {
                      type: "base64",
                      media_type: "image/png",
                      data: screenshot.replace(/^data:image\/png;base64,/, "")
                    }
                  },
                  {
                    type: "text",
                    text: `Error: ${errorMessage}`
                  }
                ]
              });
              logger({
                category: "agent",
                message: `Added error tool result with screenshot for tool_use_id: ${item.id}`,
                level: 1
              });
            } else {
              nextInputItems.push({
                type: "tool_result",
                tool_use_id: item.id,
                content: `Error: ${errorMessage}`
              });
              logger({
                category: "agent",
                message: `Added error tool result for tool_use_id: ${item.id}`,
                level: 1
              });
            }
          } catch (screenshotError) {
            logger({
              category: "agent",
              message: `Error capturing screenshot: ${String(screenshotError)}`,
              level: 0
            });
            nextInputItems.push({
              type: "tool_result",
              tool_use_id: item.id,
              content: `Error: ${errorMessage}`
            });
            logger({
              category: "agent",
              message: `Added text error tool result for tool_use_id: ${item.id}`,
              level: 1
            });
          }
        }
      }
      logger({
        category: "agent",
        message: `Prepared ${nextInputItems.length} input items for next request`,
        level: 2
      });
      return nextInputItems;
    });
  }
  convertToolUseToAction(item) {
    try {
      const { name, input } = item;
      if (name === "computer") {
        const action = input.action;
        if (!action) {
          console.warn("Missing action in tool use item:", item);
          return null;
        }
        if (action === "screenshot") {
          return __spreadValues({
            type: "screenshot"
          }, input);
        } else if (action === "click") {
          return __spreadValues({
            type: "click",
            x: input.x,
            y: input.y,
            button: input.button || "left"
          }, input);
        } else if (action === "type") {
          return __spreadValues({
            type: "type",
            text: input.text
          }, input);
        } else if (action === "keypress") {
          return __spreadValues({
            type: "keypress",
            keys: input.keys
          }, input);
        } else if (action === "double_click" || action === "doubleClick") {
          return __spreadValues({
            type: action,
            x: input.x,
            y: input.y
          }, input);
        } else if (action === "scroll") {
          const x = input.x || (input.coordinate ? input.coordinate[0] : 0);
          const y = input.y || (input.coordinate ? input.coordinate[1] : 0);
          let scroll_x = 0;
          let scroll_y = 0;
          const scrollAmount = input.scroll_amount || 5;
          const scrollMultiplier = 100;
          if (input.scroll_direction) {
            const direction = input.scroll_direction;
            if (direction === "down") {
              scroll_y = scrollAmount * scrollMultiplier;
            } else if (direction === "up") {
              scroll_y = -scrollAmount * scrollMultiplier;
            } else if (direction === "right") {
              scroll_x = scrollAmount * scrollMultiplier;
            } else if (direction === "left") {
              scroll_x = -scrollAmount * scrollMultiplier;
            }
          } else {
            scroll_x = input.scroll_x || 0;
            scroll_y = input.scroll_y || 0;
          }
          return __spreadValues({
            type: "scroll",
            x,
            y,
            scroll_x,
            scroll_y
          }, input);
        } else if (action === "move") {
          const coordinates = input.coordinate;
          const x = coordinates ? coordinates[0] : input.x || 0;
          const y = coordinates ? coordinates[1] : input.y || 0;
          return __spreadValues({
            type: "move",
            x,
            y
          }, input);
        } else if (action === "drag") {
          const path4 = input.path || (input.coordinate ? [
            {
              x: input.start_coordinate[0],
              y: input.start_coordinate[1]
            },
            {
              x: input.coordinate[0],
              y: input.coordinate[1]
            }
          ] : []);
          return __spreadValues({
            type: "drag",
            path: path4
          }, input);
        } else if (action === "wait") {
          return __spreadValues({
            type: "wait"
          }, input);
        } else if (action === "key") {
          const text = input.text;
          let mappedKey = text;
          if (text === "Return" || text === "return" || text === "Enter" || text === "enter") {
            mappedKey = "Enter";
          } else if (text === "Tab" || text === "tab") {
            mappedKey = "Tab";
          } else if (text === "Escape" || text === "escape" || text === "Esc" || text === "esc") {
            mappedKey = "Escape";
          } else if (text === "Backspace" || text === "backspace") {
            mappedKey = "Backspace";
          } else if (text === "Delete" || text === "delete" || text === "Del" || text === "del") {
            mappedKey = "Delete";
          } else if (text === "ArrowUp" || text === "Up" || text === "up") {
            mappedKey = "ArrowUp";
          } else if (text === "ArrowDown" || text === "Down" || text === "down") {
            mappedKey = "ArrowDown";
          } else if (text === "ArrowLeft" || text === "Left" || text === "left") {
            mappedKey = "ArrowLeft";
          } else if (text === "ArrowRight" || text === "Right" || text === "right") {
            mappedKey = "ArrowRight";
          }
          return __spreadValues({
            type: "key",
            text: mappedKey
          }, input);
        } else if (action === "left_click") {
          const coordinates = input.coordinate;
          const x = coordinates ? coordinates[0] : input.x || 0;
          const y = coordinates ? coordinates[1] : input.y || 0;
          return __spreadValues({
            type: "click",
            x,
            y,
            button: "left"
          }, input);
        } else {
          console.log(`Using default action mapping for ${action}`);
          return __spreadValues({
            type: action
          }, input);
        }
      } else if (name === "str_replace_editor" || name === "bash") {
        return {
          type: name,
          params: input
        };
      }
      console.warn(`Unknown tool name: ${name}`);
      return null;
    } catch (error) {
      console.error("Error converting tool use to action:", error);
      return null;
    }
  }
  captureScreenshot(options) {
    return __async(this, null, function* () {
      if (options == null ? void 0 : options.base64Image) {
        return `data:image/png;base64,${options.base64Image}`;
      }
      if (this.screenshotProvider) {
        try {
          const base64Image = yield this.screenshotProvider();
          return `data:image/png;base64,${base64Image}`;
        } catch (error) {
          console.error("Error capturing screenshot:", error);
          throw error;
        }
      }
      throw new Error("Screenshot provider not available");
    });
  }
};

// lib/agent/AgentProvider.ts
var modelToAgentProviderMap = {
  "computer-use-preview-2025-02-04": "openai",
  "computer-use-preview-2025-03-11": "openai",
  "claude-3-5-sonnet-20240620": "anthropic",
  "claude-3-5-sonnet-20241022": "anthropic",
  "claude-3-7-sonnet-20250219": "anthropic"
  // Add newer Claude models
};
var AgentProvider = class _AgentProvider {
  /**
   * Create a new agent provider
   */
  constructor(logger) {
    this.logger = logger;
  }
  getClient(modelName, clientOptions, userProvidedInstructions, remoteAgentClientHandler) {
    const type = _AgentProvider.getAgentProvider(modelName);
    this.logger({
      category: "agent",
      message: `Getting agent client for type: ${type}, model: ${modelName}`,
      level: 2
    });
    try {
      switch (type) {
        case "openai":
          return new OpenAICUAClient(
            type,
            modelName,
            userProvidedInstructions,
            clientOptions,
            remoteAgentClientHandler
          );
        case "anthropic":
          return new AnthropicCUAClient(
            type,
            modelName,
            userProvidedInstructions,
            clientOptions,
            remoteAgentClientHandler
          );
        default:
          throw new Error(`Unknown agent type: ${type}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger({
        category: "agent",
        message: `Error creating agent client: ${errorMessage}`,
        level: 0
      });
      throw error;
    }
  }
  static getAgentProvider(modelName) {
    if (modelName in modelToAgentProviderMap) {
      return modelToAgentProviderMap[modelName];
    }
    throw new Error(`Unknown model name: ${modelName}`);
  }
};

// lib/agent/StagehandAgent.ts
var StagehandAgent = class {
  constructor(client, logger) {
    this.client = client;
    this.logger = logger;
  }
  execute(optionsOrInstruction) {
    return __async(this, null, function* () {
      const options = typeof optionsOrInstruction === "string" ? { instruction: optionsOrInstruction } : optionsOrInstruction;
      this.logger({
        category: "agent",
        message: `Executing agent task: ${options.instruction}`,
        level: 1
      });
      const executionOptions = {
        options,
        logger: this.logger,
        retries: 3
      };
      return yield this.client.execute(executionOptions);
    });
  }
  getModelName() {
    return this.client.modelName;
  }
  getAgentType() {
    return this.client.type;
  }
};

// lib/handlers/agentHandler.ts
var StagehandAgentHandler = class {
  constructor(stagehandPage, logger, options) {
    this.stagehandPage = stagehandPage;
    this.logger = logger;
    this.options = options;
    this.provider = new AgentProvider(logger);
    const client = this.provider.getClient(
      options.modelName,
      options.clientOptions || {},
      options.userProvidedInstructions,
      options.remoteAgentClientHandler
    );
    this.agentClient = client;
    this.setupAgentClient();
    this.agent = new StagehandAgent(client, logger);
  }
  setupAgentClient() {
    this.agentClient.setScreenshotProvider(() => __async(this, null, function* () {
      const screenshot = yield this.stagehandPage.page.screenshot({
        fullPage: false
      });
      return screenshot.toString("base64");
    }));
    this.agentClient.setActionHandler((action) => __async(this, null, function* () {
      var _a;
      const defaultDelay = 1e3;
      const waitBetweenActions = ((_a = this.options.clientOptions) == null ? void 0 : _a.waitBetweenActions) || defaultDelay;
      try {
        try {
          yield this.injectCursor();
        } catch (e) {
        }
        yield new Promise((resolve) => setTimeout(resolve, 500));
        yield this.executeAction(action);
        yield new Promise((resolve) => setTimeout(resolve, waitBetweenActions));
        try {
          yield this.captureAndSendScreenshot();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          this.logger({
            category: "agent",
            message: `Warning: Failed to take screenshot after action: ${errorMessage}. Continuing execution.`,
            level: 1
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger({
          category: "agent",
          message: `Error executing action ${action.type}: ${errorMessage}`,
          level: 0
        });
        throw error;
      }
    }));
    this.updateClientViewport();
    this.updateClientUrl();
  }
  /**
   * Execute a task with the agent
   */
  execute(optionsOrInstruction) {
    return __async(this, null, function* () {
      const options = typeof optionsOrInstruction === "string" ? { instruction: optionsOrInstruction } : optionsOrInstruction;
      this.logger({
        category: "agent",
        message: `Executing agent task: ${options.instruction}`,
        level: 1
      });
      try {
        yield this.injectCursor();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger({
          category: "agent",
          message: `Warning: Failed to inject cursor: ${errorMessage}. Continuing with execution.`,
          level: 1
        });
      }
      if (options.autoScreenshot !== false) {
        try {
          yield this.captureAndSendScreenshot();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          this.logger({
            category: "agent",
            message: `Warning: Failed to take initial screenshot: ${errorMessage}. Continuing with execution.`,
            level: 1
          });
        }
      }
      const result = yield this.agent.execute(optionsOrInstruction);
      return result;
    });
  }
  /**
   * Execute a single action on the page
   */
  executeAction(action) {
    return __async(this, null, function* () {
      try {
        switch (action.type) {
          case "click": {
            const { x, y, button = "left" } = action;
            yield this.updateCursorPosition(x, y);
            yield this.animateClick(x, y);
            yield new Promise((resolve) => setTimeout(resolve, 300));
            yield this.stagehandPage.page.mouse.click(x, y, {
              button
            });
            return { success: true };
          }
          case "double_click": {
            const { x, y } = action;
            yield this.updateCursorPosition(x, y);
            yield this.animateClick(x, y);
            yield new Promise((resolve) => setTimeout(resolve, 200));
            yield this.animateClick(x, y);
            yield new Promise((resolve) => setTimeout(resolve, 200));
            yield this.stagehandPage.page.mouse.dblclick(
              x,
              y
            );
            return { success: true };
          }
          // Handle the case for "doubleClick" as well for backward compatibility
          case "doubleClick": {
            const { x, y } = action;
            yield this.updateCursorPosition(x, y);
            yield this.animateClick(x, y);
            yield new Promise((resolve) => setTimeout(resolve, 200));
            yield this.animateClick(x, y);
            yield new Promise((resolve) => setTimeout(resolve, 200));
            yield this.stagehandPage.page.mouse.dblclick(
              x,
              y
            );
            return { success: true };
          }
          case "type": {
            const { text } = action;
            yield this.stagehandPage.page.keyboard.type(text);
            return { success: true };
          }
          case "keypress": {
            const { keys } = action;
            if (Array.isArray(keys)) {
              for (const key of keys) {
                if (key.includes("ENTER")) {
                  yield this.stagehandPage.page.keyboard.press("Enter");
                } else if (key.includes("SPACE")) {
                  yield this.stagehandPage.page.keyboard.press(" ");
                } else if (key.includes("TAB")) {
                  yield this.stagehandPage.page.keyboard.press("Tab");
                } else if (key.includes("ESCAPE") || key.includes("ESC")) {
                  yield this.stagehandPage.page.keyboard.press("Escape");
                } else if (key.includes("BACKSPACE")) {
                  yield this.stagehandPage.page.keyboard.press("Backspace");
                } else if (key.includes("DELETE")) {
                  yield this.stagehandPage.page.keyboard.press("Delete");
                } else if (key.includes("ARROW_UP")) {
                  yield this.stagehandPage.page.keyboard.press("ArrowUp");
                } else if (key.includes("ARROW_DOWN")) {
                  yield this.stagehandPage.page.keyboard.press("ArrowDown");
                } else if (key.includes("ARROW_LEFT")) {
                  yield this.stagehandPage.page.keyboard.press("ArrowLeft");
                } else if (key.includes("ARROW_RIGHT")) {
                  yield this.stagehandPage.page.keyboard.press("ArrowRight");
                } else {
                  const playwrightKey = this.convertKeyName(key);
                  yield this.stagehandPage.page.keyboard.press(playwrightKey);
                }
              }
            }
            return { success: true };
          }
          case "scroll": {
            const { x, y, scroll_x = 0, scroll_y = 0 } = action;
            yield this.stagehandPage.page.mouse.move(x, y);
            yield this.stagehandPage.page.evaluate(
              ({ scrollX, scrollY }) => window.scrollBy(scrollX, scrollY),
              { scrollX: scroll_x, scrollY: scroll_y }
            );
            return { success: true };
          }
          case "drag": {
            const { path: path4 } = action;
            if (Array.isArray(path4) && path4.length >= 2) {
              const start = path4[0];
              yield this.updateCursorPosition(start.x, start.y);
              yield this.stagehandPage.page.mouse.move(start.x, start.y);
              yield this.stagehandPage.page.mouse.down();
              for (let i = 1; i < path4.length; i++) {
                yield this.updateCursorPosition(path4[i].x, path4[i].y);
                yield this.stagehandPage.page.mouse.move(path4[i].x, path4[i].y);
              }
              yield this.stagehandPage.page.mouse.up();
            }
            return { success: true };
          }
          case "move": {
            const { x, y } = action;
            yield this.updateCursorPosition(x, y);
            yield this.stagehandPage.page.mouse.move(x, y);
            return { success: true };
          }
          case "wait": {
            yield new Promise((resolve) => setTimeout(resolve, 1e3));
            return { success: true };
          }
          case "screenshot": {
            return { success: true };
          }
          case "function": {
            const { name, arguments: args = {} } = action;
            if (name === "goto" && typeof args === "object" && args !== null && "url" in args) {
              yield this.stagehandPage.page.goto(args.url);
              this.updateClientUrl();
              return { success: true };
            } else if (name === "back") {
              yield this.stagehandPage.page.goBack();
              this.updateClientUrl();
              return { success: true };
            } else if (name === "forward") {
              yield this.stagehandPage.page.goForward();
              this.updateClientUrl();
              return { success: true };
            } else if (name === "reload") {
              yield this.stagehandPage.page.reload();
              this.updateClientUrl();
              return { success: true };
            }
            return {
              success: false,
              error: `Unsupported function: ${name}`
            };
          }
          case "key": {
            const { text } = action;
            if (text === "Return" || text === "Enter") {
              yield this.stagehandPage.page.keyboard.press("Enter");
            } else if (text === "Tab") {
              yield this.stagehandPage.page.keyboard.press("Tab");
            } else if (text === "Escape" || text === "Esc") {
              yield this.stagehandPage.page.keyboard.press("Escape");
            } else if (text === "Backspace") {
              yield this.stagehandPage.page.keyboard.press("Backspace");
            } else if (text === "Page_Up") {
              yield this.stagehandPage.page.keyboard.press("PageUp");
            } else if (text === "Page_Down") {
              yield this.stagehandPage.page.keyboard.press("PageDown");
            } else {
              yield this.stagehandPage.page.keyboard.press(text);
            }
            return { success: true };
          }
          default:
            return {
              success: false,
              error: `Unsupported action type: ${action.type}`
            };
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger({
          category: "agent",
          message: `Error executing action ${action.type}: ${errorMessage}`,
          level: 0
        });
        return {
          success: false,
          error: errorMessage
        };
      }
    });
  }
  updateClientViewport() {
    const viewportSize = this.stagehandPage.page.viewportSize();
    if (viewportSize) {
      this.agentClient.setViewport(viewportSize.width, viewportSize.height);
    }
  }
  updateClientUrl() {
    const url = this.stagehandPage.page.url();
    this.agentClient.setCurrentUrl(url);
  }
  getAgent() {
    return this.agent;
  }
  getClient() {
    return this.agentClient;
  }
  captureAndSendScreenshot() {
    return __async(this, null, function* () {
      this.logger({
        category: "agent",
        message: "Taking screenshot and sending to agent",
        level: 1
      });
      try {
        const screenshot = yield this.stagehandPage.page.screenshot({
          type: "png",
          fullPage: false
        });
        const base64Image = screenshot.toString("base64");
        return yield this.agentClient.captureScreenshot({
          base64Image,
          currentUrl: this.stagehandPage.page.url()
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger({
          category: "agent",
          message: `Error capturing screenshot: ${errorMessage}`,
          level: 0
        });
        return null;
      }
    });
  }
  /**
   * Inject a cursor element into the page for visual feedback
   */
  injectCursor() {
    return __async(this, null, function* () {
      try {
        const CURSOR_ID = "stagehand-cursor";
        const HIGHLIGHT_ID = "stagehand-highlight";
        const cursorExists = yield this.stagehandPage.page.evaluate(
          (id) => {
            return !!document.getElementById(id);
          },
          CURSOR_ID
        );
        if (cursorExists) {
          return;
        }
        yield this.stagehandPage.page.evaluate(`
        (function(cursorId, highlightId) {
          // Create cursor element
          const cursor = document.createElement('div');
          cursor.id = cursorId;
          
          // Use the provided SVG for a custom cursor
          cursor.innerHTML = \`
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 28" width="28" height="28">
            <polygon fill="#000000" points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5"/>
            <rect x="12.5" y="13.6" transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)" width="2" height="8" fill="#000000"/>
          </svg>
          \`;
          
          // Style the cursor
          cursor.style.position = 'absolute';
          cursor.style.top = '0';
          cursor.style.left = '0';
          cursor.style.width = '28px';
          cursor.style.height = '28px';
          cursor.style.pointerEvents = 'none';
          cursor.style.zIndex = '9999999';
          cursor.style.transform = 'translate(-4px, -4px)'; // Adjust to align the pointer tip
          
          // Create highlight element for click animation
          const highlight = document.createElement('div');
          highlight.id = highlightId;
          highlight.style.position = 'absolute';
          highlight.style.width = '20px';
          highlight.style.height = '20px';
          highlight.style.borderRadius = '50%';
          highlight.style.backgroundColor = 'rgba(66, 134, 244, 0)';
          highlight.style.transform = 'translate(-50%, -50%) scale(0)';
          highlight.style.pointerEvents = 'none';
          highlight.style.zIndex = '9999998';
          highlight.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
          highlight.style.opacity = '0';
          
          // Add elements to the document
          document.body.appendChild(cursor);
          document.body.appendChild(highlight);
          
          // Add a function to update cursor position
          window.__updateCursorPosition = function(x, y) {
            if (cursor) {
              cursor.style.transform = \`translate(\${x - 4}px, \${y - 4}px)\`;
            }
          };
          
          // Add a function to animate click
          window.__animateClick = function(x, y) {
            if (highlight) {
              highlight.style.left = \`\${x}px\`;
              highlight.style.top = \`\${y}px\`;
              highlight.style.transform = 'translate(-50%, -50%) scale(1)';
              highlight.style.opacity = '1';
              
              setTimeout(() => {
                highlight.style.transform = 'translate(-50%, -50%) scale(0)';
                highlight.style.opacity = '0';
              }, 300);
            }
          };
        })('${CURSOR_ID}', '${HIGHLIGHT_ID}');
      `);
        this.logger({
          category: "agent",
          message: "Cursor injected for visual feedback",
          level: 1
        });
      } catch (error) {
        this.logger({
          category: "agent",
          message: `Failed to inject cursor: ${error}`,
          level: 0
        });
      }
    });
  }
  /**
   * Update the cursor position on the page
   */
  updateCursorPosition(x, y) {
    return __async(this, null, function* () {
      try {
        yield this.stagehandPage.page.evaluate(
          ({ x: x2, y: y2 }) => {
            if (window.__updateCursorPosition) {
              window.__updateCursorPosition(x2, y2);
            }
          },
          { x, y }
        );
      } catch (e) {
      }
    });
  }
  /**
   * Animate a click at the given position
   */
  animateClick(x, y) {
    return __async(this, null, function* () {
      try {
        yield this.stagehandPage.page.evaluate(
          ({ x: x2, y: y2 }) => {
            if (window.__animateClick) {
              window.__animateClick(x2, y2);
            }
          },
          { x, y }
        );
      } catch (e) {
      }
    });
  }
  convertKeyName(key) {
    const keyMap = {
      ENTER: "Enter",
      ESCAPE: "Escape",
      BACKSPACE: "Backspace",
      TAB: "Tab",
      SPACE: " ",
      ARROWUP: "ArrowUp",
      ARROWDOWN: "ArrowDown",
      ARROWLEFT: "ArrowLeft",
      ARROWRIGHT: "ArrowRight",
      UP: "ArrowUp",
      DOWN: "ArrowDown",
      LEFT: "ArrowLeft",
      RIGHT: "ArrowRight",
      SHIFT: "Shift",
      CONTROL: "Control",
      ALT: "Alt",
      META: "Meta",
      COMMAND: "Meta",
      CMD: "Meta",
      CTRL: "Control",
      DELETE: "Delete",
      HOME: "Home",
      END: "End",
      PAGEUP: "PageUp",
      PAGEDOWN: "PageDown"
    };
    const upperKey = key.toUpperCase();
    return keyMap[upperKey] || key;
  }
};

// types/operator.ts
var import_zod4 = require("zod");
var operatorResponseSchema = import_zod4.z.object({
  reasoning: import_zod4.z.string().describe(
    "The reasoning for the step taken. If this step's method is `close`, the goal was to extract data, and the task was successful, state the data that was extracted."
  ),
  method: import_zod4.z.enum([
    "act",
    "extract",
    "goto",
    "close",
    "wait",
    "navback",
    "refresh"
  ]).describe(`The action to perform on the page based off of the goal and the current state of the page.
      goto: Navigate to a specific URL.
      act: Perform an action on the page.  
      extract: Extract data from the page.
      close: The task is complete, close the browser.
      wait: Wait for a period of time.
      navback: Navigate back to the previous page. Do not navigate back if you are already on the first page.
      refresh: Refresh the page.`),
  parameters: import_zod4.z.string().describe(
    `The parameter for the action. Only pass in a parameter for the following methods:
        - act: The action to perform. e.g. "click on the submit button" or "type [email] into the email input field and press enter"
        - extract: The data to extract. e.g. "the title of the article". If you want to extract all of the text on the page, leave this undefined.
        - wait: The amount of time to wait in milliseconds.
        - goto: The URL to navigate to. e.g. "https://www.google.com"
        The other methods do not require a parameter.`
  ).optional(),
  taskComplete: import_zod4.z.boolean().describe(
    "Whether the task is complete. If true, the task is complete and no more steps are needed. If you chose to close the task because the goal is not achievable, set this to false."
  )
});
var operatorSummarySchema = import_zod4.z.object({
  answer: import_zod4.z.string().describe("The final answer to the original instruction.")
});

// lib/handlers/operatorHandler.ts
var StagehandOperatorHandler = class {
  constructor(stagehandPage, logger, llmClient) {
    this.stagehandPage = stagehandPage;
    this.logger = logger;
    this.llmClient = llmClient;
  }
  execute(instructionOrOptions) {
    return __async(this, null, function* () {
      const options = typeof instructionOrOptions === "string" ? { instruction: instructionOrOptions } : instructionOrOptions;
      this.messages = [buildOperatorSystemPrompt(options.instruction)];
      let completed = false;
      let currentStep = 0;
      const maxSteps = options.maxSteps || 10;
      const actions = [];
      while (!completed && currentStep < maxSteps) {
        const url = this.stagehandPage.page.url();
        if (!url || url === "about:blank") {
          this.messages.push({
            role: "user",
            content: [
              {
                type: "text",
                text: "No page is currently loaded. The first step should be a 'goto' action to navigate to a URL."
              }
            ]
          });
        } else {
          const screenshot = yield this.stagehandPage.page.screenshot({
            type: "png",
            fullPage: false
          });
          const base64Image = screenshot.toString("base64");
          let messageText = `Here is a screenshot of the current page (URL: ${url}):`;
          messageText = `Previous actions were: ${actions.map((action) => {
            let result2 = "";
            if (action.type === "act") {
              const args = action.playwrightArguments;
              result2 = `Performed a "${args.method}" action ${args.arguments.length > 0 ? `with arguments: ${args.arguments.map((arg) => `"${arg}"`).join(", ")}` : ""} on "${args.description}"`;
            } else if (action.type === "extract") {
              result2 = `Extracted data: ${action.extractionResult}`;
            }
            return `[${action.type}] ${action.reasoning}. Result: ${result2}`;
          }).join("\n")}

${messageText}`;
          this.messages.push({
            role: "user",
            content: [
              {
                type: "text",
                text: messageText
              },
              this.llmClient.type === "anthropic" ? {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/png",
                  data: base64Image
                },
                text: "the screenshot of the current page"
              } : {
                type: "image_url",
                image_url: { url: `data:image/png;base64,${base64Image}` }
              }
            ]
          });
        }
        const result = yield this.getNextStep(currentStep);
        if (result.method === "close") {
          completed = true;
        }
        let playwrightArguments;
        if (result.method === "act") {
          [playwrightArguments] = yield this.stagehandPage.page.observe(
            result.parameters
          );
        }
        let extractionResult;
        if (result.method === "extract") {
          extractionResult = yield this.stagehandPage.page.extract(
            result.parameters
          );
        }
        yield this.executeAction(result, playwrightArguments, extractionResult);
        actions.push({
          type: result.method,
          reasoning: result.reasoning,
          taskCompleted: result.taskComplete,
          parameters: result.parameters,
          playwrightArguments,
          extractionResult
        });
        currentStep++;
      }
      return {
        success: true,
        message: yield this.getSummary(options.instruction),
        actions,
        completed: actions[actions.length - 1].taskCompleted
      };
    });
  }
  getNextStep(currentStep) {
    return __async(this, null, function* () {
      const { data: response } = yield this.llmClient.createChatCompletion({
        options: {
          messages: this.messages,
          response_model: {
            name: "operatorResponseSchema",
            schema: operatorResponseSchema
          },
          requestId: `operator-step-${currentStep}`
        },
        logger: this.logger
      });
      return response;
    });
  }
  getSummary(goal) {
    return __async(this, null, function* () {
      const { data: response } = yield this.llmClient.createChatCompletion({
        options: {
          messages: [
            ...this.messages,
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Now use the steps taken to answer the original instruction of ${goal}.`
                }
              ]
            }
          ],
          response_model: {
            name: "operatorSummarySchema",
            schema: operatorSummarySchema
          },
          requestId: "operator-summary"
        },
        logger: this.logger
      });
      return response.answer;
    });
  }
  executeAction(action, playwrightArguments, extractionResult) {
    return __async(this, null, function* () {
      const { method, parameters } = action;
      const page = this.stagehandPage.page;
      if (method === "close") {
        return;
      }
      switch (method) {
        case "act":
          if (!playwrightArguments) {
            throw new Error("No playwright arguments provided");
          }
          yield page.act(playwrightArguments);
          break;
        case "extract":
          if (!extractionResult) {
            throw new Error("No extraction result provided");
          }
          return extractionResult;
        case "goto":
          yield page.goto(parameters, { waitUntil: "load" });
          break;
        case "wait":
          yield page.waitForTimeout(parseInt(parameters));
          break;
        case "navback":
          yield page.goBack();
          break;
        case "refresh":
          yield page.reload();
          break;
        default:
          throw new Error(`Unknown action: ${method}`);
      }
    });
  }
};

// types/model.ts
var import_zod5 = require("zod");
var AvailableModelSchema = import_zod5.z.enum([
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4o-2024-08-06",
  "gpt-4.5-preview",
  "claude-3-5-sonnet-latest",
  "claude-3-5-sonnet-20241022",
  "claude-3-5-sonnet-20240620",
  "claude-3-7-sonnet-latest",
  "claude-3-7-sonnet-20250219",
  "o1-mini",
  "o1-preview",
  "o3-mini",
  "cerebras-llama-3.3-70b",
  "cerebras-llama-3.1-8b",
  "groq-llama-3.3-70b-versatile",
  "groq-llama-3.3-70b-specdec"
]);

// lib/index.ts
import_dotenv.default.config({ path: ".env" });
var DEFAULT_MODEL_NAME = "gpt-4o";
var BROWSERBASE_REGION_DOMAIN2 = {
  "us-west-2": "wss://connect.usw2.browserbase.com",
  "us-east-1": "wss://connect.use1.browserbase.com",
  "eu-central-1": "wss://connect.euc1.browserbase.com",
  "ap-southeast-1": "wss://connect.apse1.browserbase.com"
};
function getBrowser(apiKey, projectId, env = "LOCAL", headless = false, logger, browserbaseSessionCreateParams, browserbaseSessionID, localBrowserLaunchOptions, browserContext) {
  return __async(this, null, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    if (browserContext) {
      return {
        context: browserContext.context,
        contextPath: browserContext.contextPath,
        env: "LOCAL"
      };
    }
    if (env === "BROWSERBASE") {
      if (!apiKey) {
        logger({
          category: "init",
          message: "BROWSERBASE_API_KEY is required to use BROWSERBASE env. Defaulting to LOCAL.",
          level: 0
        });
        env = "LOCAL";
      }
      if (!projectId) {
        logger({
          category: "init",
          message: "BROWSERBASE_PROJECT_ID is required for some Browserbase features that may not work without it.",
          level: 1
        });
      }
    }
    if (env === "BROWSERBASE") {
      if (!apiKey) {
        throw new Error("BROWSERBASE_API_KEY is required.");
      }
      let debugUrl = void 0;
      let sessionUrl = void 0;
      let sessionId;
      let connectUrl;
      const browserbase = new import_sdk4.Browserbase({
        apiKey
      });
      if (browserbaseSessionID) {
        try {
          const sessionStatus = yield browserbase.sessions.retrieve(browserbaseSessionID);
          if (sessionStatus.status !== "RUNNING") {
            throw new Error(
              `Session ${browserbaseSessionID} is not running (status: ${sessionStatus.status})`
            );
          }
          sessionId = browserbaseSessionID;
          const browserbaseDomain = BROWSERBASE_REGION_DOMAIN2[sessionStatus.region] || "wss://connect.browserbase.com";
          connectUrl = `${browserbaseDomain}?apiKey=${apiKey}&sessionId=${sessionId}`;
          logger({
            category: "init",
            message: "resuming existing browserbase session...",
            level: 1,
            auxiliary: {
              sessionId: {
                value: sessionId,
                type: "string"
              }
            }
          });
        } catch (error) {
          logger({
            category: "init",
            message: "failed to resume session",
            level: 1,
            auxiliary: {
              error: {
                value: error.message,
                type: "string"
              },
              trace: {
                value: error.stack,
                type: "string"
              }
            }
          });
          throw error;
        }
      } else {
        logger({
          category: "init",
          message: "creating new browserbase session...",
          level: 0
        });
        if (!projectId) {
          throw new Error(
            "BROWSERBASE_PROJECT_ID is required for new Browserbase sessions."
          );
        }
        const session = yield browserbase.sessions.create(__spreadValues({
          projectId
        }, browserbaseSessionCreateParams));
        sessionId = session.id;
        connectUrl = session.connectUrl;
        logger({
          category: "init",
          message: "created new browserbase session",
          level: 1,
          auxiliary: {
            sessionId: {
              value: sessionId,
              type: "string"
            }
          }
        });
      }
      const browser = yield import_test2.chromium.connectOverCDP(connectUrl);
      const { debuggerUrl } = yield browserbase.sessions.debug(sessionId);
      debugUrl = debuggerUrl;
      sessionUrl = `https://www.browserbase.com/sessions/${sessionId}`;
      logger({
        category: "init",
        message: browserbaseSessionID ? "browserbase session resumed" : "browserbase session started",
        level: 0,
        auxiliary: {
          sessionUrl: {
            value: sessionUrl,
            type: "string"
          },
          debugUrl: {
            value: debugUrl,
            type: "string"
          },
          sessionId: {
            value: sessionId,
            type: "string"
          }
        }
      });
      const context = browser.contexts()[0];
      return { browser, context, debugUrl, sessionUrl, sessionId, env };
    } else {
      logger({
        category: "init",
        message: "launching local browser",
        level: 0,
        auxiliary: {
          headless: {
            value: headless.toString(),
            type: "boolean"
          }
        }
      });
      if (localBrowserLaunchOptions) {
        logger({
          category: "init",
          message: "local browser launch options",
          level: 0,
          auxiliary: {
            localLaunchOptions: {
              value: JSON.stringify(localBrowserLaunchOptions),
              type: "string"
            }
          }
        });
      }
      let userDataDir = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.userDataDir;
      if (!userDataDir) {
        const tmpDirPath = import_path2.default.join(import_os.default.tmpdir(), "stagehand");
        if (!import_fs2.default.existsSync(tmpDirPath)) {
          import_fs2.default.mkdirSync(tmpDirPath, { recursive: true });
        }
        const tmpDir = import_fs2.default.mkdtempSync(import_path2.default.join(tmpDirPath, "ctx_"));
        import_fs2.default.mkdirSync(import_path2.default.join(tmpDir, "userdir/Default"), { recursive: true });
        const defaultPreferences = {
          plugins: {
            always_open_pdf_externally: true
          }
        };
        import_fs2.default.writeFileSync(
          import_path2.default.join(tmpDir, "userdir/Default/Preferences"),
          JSON.stringify(defaultPreferences)
        );
        userDataDir = import_path2.default.join(tmpDir, "userdir");
      }
      let downloadsPath = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.downloadsPath;
      if (!downloadsPath) {
        downloadsPath = import_path2.default.join(process.cwd(), "downloads");
        import_fs2.default.mkdirSync(downloadsPath, { recursive: true });
      }
      const context = yield import_test2.chromium.launchPersistentContext(userDataDir, {
        acceptDownloads: (_a = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.acceptDownloads) != null ? _a : true,
        headless: (_b = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.headless) != null ? _b : headless,
        viewport: {
          width: (_d = (_c = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.viewport) == null ? void 0 : _c.width) != null ? _d : 1024,
          height: (_f = (_e = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.viewport) == null ? void 0 : _e.height) != null ? _f : 768
        },
        locale: (_g = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.locale) != null ? _g : "en-US",
        timezoneId: (_h = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.timezoneId) != null ? _h : "America/New_York",
        deviceScaleFactor: (_i = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.deviceScaleFactor) != null ? _i : 1,
        args: (_j = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.args) != null ? _j : [
          "--enable-webgl",
          "--use-gl=swiftshader",
          "--enable-accelerated-2d-canvas",
          "--disable-blink-features=AutomationControlled",
          "--disable-web-security"
        ],
        bypassCSP: (_k = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.bypassCSP) != null ? _k : true,
        proxy: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.proxy,
        geolocation: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.geolocation,
        hasTouch: (_l = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.hasTouch) != null ? _l : true,
        ignoreHTTPSErrors: (_m = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.ignoreHTTPSErrors) != null ? _m : true,
        permissions: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.permissions,
        recordHar: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.recordHar,
        recordVideo: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.recordVideo,
        tracesDir: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.tracesDir,
        extraHTTPHeaders: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.extraHTTPHeaders,
        chromiumSandbox: (_n = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.chromiumSandbox) != null ? _n : false,
        devtools: (_o = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.devtools) != null ? _o : false,
        env: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.env,
        executablePath: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.executablePath,
        handleSIGHUP: (_p = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.handleSIGHUP) != null ? _p : true,
        handleSIGINT: (_q = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.handleSIGINT) != null ? _q : true,
        handleSIGTERM: (_r = localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.handleSIGTERM) != null ? _r : true,
        ignoreDefaultArgs: localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.ignoreDefaultArgs
      });
      if (localBrowserLaunchOptions == null ? void 0 : localBrowserLaunchOptions.cookies) {
        context.addCookies(localBrowserLaunchOptions.cookies);
      }
      logger({
        category: "init",
        message: "local browser started successfully."
      });
      yield applyStealthScripts(context);
      return { context, contextPath: userDataDir, env: "LOCAL" };
    }
  });
}
function applyStealthScripts(context) {
  return __async(this, null, function* () {
    yield context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => void 0
      });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en"]
      });
      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5]
      });
      delete window.__playwright;
      delete window.__pw_manual;
      delete window.__PW_inspect;
      Object.defineProperty(navigator, "headless", {
        get: () => false
      });
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters) => parameters.name === "notifications" ? Promise.resolve({
        state: Notification.permission
      }) : originalQuery(parameters);
    });
  });
}
var defaultLogger = (logLine) => __async(void 0, null, function* () {
  console.log(logLineToString(logLine));
});
var Stagehand3 = class {
  constructor({
    env,
    apiKey,
    projectId,
    verbose,
    debugDom,
    llmProvider,
    llmClient,
    headless,
    logger,
    browserbaseSessionCreateParams,
    domSettleTimeoutMs,
    enableCaching,
    browserbaseSessionID,
    modelName,
    modelClientOptions,
    systemPrompt,
    useAPI,
    localBrowserLaunchOptions,
    selfHeal = true,
    waitForCaptchaSolves = false,
    browserContext,
    remoteClientHandler,
    actTimeoutMs = 6e4,
    logInferenceToFile = false
  } = {
    env: "BROWSERBASE"
  }) {
    this.cleanupCalled = false;
    this.stagehandMetrics = {
      actPromptTokens: 0,
      actCompletionTokens: 0,
      actInferenceTimeMs: 0,
      extractPromptTokens: 0,
      extractCompletionTokens: 0,
      extractInferenceTimeMs: 0,
      observePromptTokens: 0,
      observeCompletionTokens: 0,
      observeInferenceTimeMs: 0,
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalInferenceTimeMs: 0
    };
    this.pending_logs_to_send_to_browserbase = [];
    this.is_processing_browserbase_logs = false;
    this.externalLogger = logger || defaultLogger;
    this.enableCaching = enableCaching != null ? enableCaching : process.env.ENABLE_CACHING && process.env.ENABLE_CACHING === "true";
    this.llmProvider = llmProvider || new LLMProvider(this.logger, this.enableCaching);
    this.intEnv = env;
    this.apiKey = apiKey != null ? apiKey : process.env.BROWSERBASE_API_KEY;
    this.projectId = projectId != null ? projectId : process.env.BROWSERBASE_PROJECT_ID;
    this.verbose = verbose != null ? verbose : 0;
    this.debugDom = debugDom != null ? debugDom : false;
    if (llmClient) {
      this.llmClient = llmClient;
    } else {
      try {
        this.llmClient = this.llmProvider.getClient(
          modelName != null ? modelName : DEFAULT_MODEL_NAME,
          modelClientOptions,
          remoteClientHandler
        );
      } catch (e) {
        this.llmClient = void 0;
      }
    }
    this.domSettleTimeoutMs = domSettleTimeoutMs != null ? domSettleTimeoutMs : 3e4;
    this.headless = headless != null ? headless : false;
    this.browserbaseSessionCreateParams = browserbaseSessionCreateParams;
    this.browserbaseSessionID = browserbaseSessionID;
    this.userProvidedInstructions = systemPrompt;
    this.usingAPI = useAPI != null ? useAPI : false;
    this.browserContext = browserContext;
    this.actTimeoutMs = actTimeoutMs;
    if (this.usingAPI && env === "LOCAL") {
      throw new Error("API mode can only be used with BROWSERBASE environment");
    } else if (this.usingAPI && !process.env.STAGEHAND_API_URL) {
      throw new Error(
        "STAGEHAND_API_URL is required when using the API. Please set it in your environment variables."
      );
    } else if (this.usingAPI && this.llmClient.type !== "openai" && this.llmClient.type !== "anthropic") {
      throw new Error(
        "API mode requires an OpenAI or Anthropic LLM. Please provide a compatible model."
      );
    }
    this.waitForCaptchaSolves = waitForCaptchaSolves;
    this.selfHeal = selfHeal;
    this.localBrowserLaunchOptions = localBrowserLaunchOptions;
    if (this.usingAPI) {
      this.registerSignalHandlers();
    }
    this.logInferenceToFile = logInferenceToFile;
  }
  setActivePage(page) {
    this.stagehandPage = page;
  }
  get page() {
    if (!this.stagehandContext) {
      throw new Error(
        "Stagehand not initialized. Make sure to await stagehand.init() first."
      );
    }
    return this.stagehandPage.page;
  }
  get metrics() {
    return this.stagehandMetrics;
  }
  updateMetrics(functionName, promptTokens, completionTokens, inferenceTimeMs) {
    switch (functionName) {
      case "ACT" /* ACT */:
        this.stagehandMetrics.actPromptTokens += promptTokens;
        this.stagehandMetrics.actCompletionTokens += completionTokens;
        this.stagehandMetrics.actInferenceTimeMs += inferenceTimeMs;
        break;
      case "EXTRACT" /* EXTRACT */:
        this.stagehandMetrics.extractPromptTokens += promptTokens;
        this.stagehandMetrics.extractCompletionTokens += completionTokens;
        this.stagehandMetrics.extractInferenceTimeMs += inferenceTimeMs;
        break;
      case "OBSERVE" /* OBSERVE */:
        this.stagehandMetrics.observePromptTokens += promptTokens;
        this.stagehandMetrics.observeCompletionTokens += completionTokens;
        this.stagehandMetrics.observeInferenceTimeMs += inferenceTimeMs;
        break;
    }
    this.updateTotalMetrics(promptTokens, completionTokens, inferenceTimeMs);
  }
  updateTotalMetrics(promptTokens, completionTokens, inferenceTimeMs) {
    this.stagehandMetrics.totalPromptTokens += promptTokens;
    this.stagehandMetrics.totalCompletionTokens += completionTokens;
    this.stagehandMetrics.totalInferenceTimeMs += inferenceTimeMs;
  }
  registerSignalHandlers() {
    const cleanup = (signal) => __async(this, null, function* () {
      if (this.cleanupCalled) return;
      this.cleanupCalled = true;
      console.log(`[${signal}] received. Ending Browserbase session...`);
      try {
        yield this.close();
      } catch (err) {
        console.error("Error ending Browserbase session:", err);
      } finally {
        process.exit(0);
      }
    });
    process.once("SIGINT", () => void cleanup("SIGINT"));
    process.once("SIGTERM", () => void cleanup("SIGTERM"));
  }
  get logger() {
    return (logLine) => {
      this.log(logLine);
    };
  }
  get env() {
    if (this.intEnv === "BROWSERBASE" && this.apiKey && this.projectId) {
      return "BROWSERBASE";
    }
    return "LOCAL";
  }
  get context() {
    if (!this.stagehandContext) {
      throw new Error(
        "Stagehand not initialized. Make sure to await stagehand.init() first."
      );
    }
    return this.stagehandContext.context;
  }
  init(initOptions) {
    return __async(this, null, function* () {
      var _a, _b;
      if (isRunningInBun()) {
        throw new Error(
          "Playwright does not currently support the Bun runtime environment. Please use Node.js instead. For more information, see: https://github.com/microsoft/playwright/issues/27139"
        );
      }
      if (initOptions) {
        console.warn(
          "Passing parameters to init() is deprecated and will be removed in the next major version. Use constructor options instead."
        );
      }
      if (this.usingAPI) {
        this.apiClient = new StagehandAPI({
          apiKey: this.apiKey,
          projectId: this.projectId,
          logger: this.logger
        });
        const { sessionId: sessionId2 } = yield this.apiClient.init({
          modelName: this.modelName,
          modelApiKey: LLMProvider.getModelProvider(this.modelName) === "openai" ? process.env.OPENAI_API_KEY : process.env.ANTHROPIC_API_KEY,
          domSettleTimeoutMs: this.domSettleTimeoutMs,
          verbose: this.verbose,
          debugDom: this.debugDom,
          systemPrompt: this.userProvidedInstructions,
          selfHeal: this.selfHeal,
          waitForCaptchaSolves: this.waitForCaptchaSolves,
          actionTimeoutMs: this.actTimeoutMs,
          browserbaseSessionCreateParams: this.browserbaseSessionCreateParams
        });
        this.browserbaseSessionID = sessionId2;
      }
      const { context, debugUrl, sessionUrl, contextPath, sessionId, env } = yield getBrowser(
        this.apiKey,
        this.projectId,
        this.env,
        this.headless,
        this.logger,
        this.browserbaseSessionCreateParams,
        this.browserbaseSessionID,
        this.localBrowserLaunchOptions,
        this.browserContext
      ).catch((e) => {
        console.error("Error in init:", e);
        const br = {
          context: void 0,
          debugUrl: void 0,
          sessionUrl: void 0,
          sessionId: void 0,
          env: this.env
        };
        return br;
      });
      this.intEnv = env;
      this.contextPath = contextPath;
      this.stagehandContext = yield StagehandContext.init(context, this);
      let defaultPage = (yield this.stagehandContext.getStagehandPages())[0];
      if ((_a = this.browserContext) == null ? void 0 : _a.createNewPage) {
        const newPwPage = yield this.context.newPage();
        defaultPage = yield new StagehandPage(
          newPwPage,
          this,
          this.stagehandContext,
          this.llmClient,
          this.userProvidedInstructions,
          this.apiClient,
          this.waitForCaptchaSolves
        ).init();
      } else if ((_b = this.browserContext) == null ? void 0 : _b.page) {
        const pwPage = this.browserContext.page;
        defaultPage = yield new StagehandPage(
          pwPage,
          this,
          this.stagehandContext,
          this.llmClient,
          this.userProvidedInstructions,
          this.apiClient,
          this.waitForCaptchaSolves
        ).init();
      }
      this.stagehandPage = defaultPage;
      if (this.headless) {
        yield this.page.setViewportSize({ width: 1280, height: 720 });
      }
      yield this.context.addInitScript({
        content: scriptContent
      });
      this.browserbaseSessionID = sessionId;
      return { debugUrl, sessionUrl, sessionId };
    });
  }
  /** @deprecated initFromPage is deprecated and will be removed in the next major version. */
  initFromPage(_0) {
    return __async(this, arguments, function* ({
      page
    }) {
      console.warn(
        "initFromPage is deprecated and will be removed in the next major version. To instantiate from a page, use `browserbaseSessionID` in the constructor."
      );
      this.stagehandPage = yield new StagehandPage(
        page,
        this,
        this.stagehandContext,
        this.llmClient
      ).init();
      this.stagehandContext = yield StagehandContext.init(page.context(), this);
      const originalGoto = this.page.goto.bind(this.page);
      this.page.goto = (url, options) => __async(this, null, function* () {
        const result = yield originalGoto(url, options);
        if (this.debugDom) {
          yield this.page.evaluate(() => window.showChunks = this.debugDom);
        }
        yield this.page.waitForLoadState("domcontentloaded");
        yield this.stagehandPage._waitForSettledDom();
        return result;
      });
      if (this.headless) {
        yield this.page.setViewportSize({ width: 1280, height: 720 });
      }
      yield this.context.addInitScript({
        content: scriptContent
      });
      return { context: this.context };
    });
  }
  log(logObj) {
    var _a;
    logObj.level = (_a = logObj.level) != null ? _a : 1;
    if (this.externalLogger) {
      this.externalLogger(logObj);
    }
    this.pending_logs_to_send_to_browserbase.push(__spreadProps(__spreadValues({}, logObj), {
      id: (0, import_crypto2.randomUUID)()
    }));
    this._run_browserbase_log_processing_cycle();
  }
  _run_browserbase_log_processing_cycle() {
    return __async(this, null, function* () {
      if (this.is_processing_browserbase_logs) {
        return;
      }
      this.is_processing_browserbase_logs = true;
      const pending_logs = [...this.pending_logs_to_send_to_browserbase];
      for (const logObj of pending_logs) {
        yield this._log_to_browserbase(logObj);
      }
      this.is_processing_browserbase_logs = false;
    });
  }
  _log_to_browserbase(logObj) {
    return __async(this, null, function* () {
      var _a;
      logObj.level = (_a = logObj.level) != null ? _a : 1;
      if (!this.stagehandPage) {
        return;
      }
      if (this.verbose >= logObj.level) {
        yield this.page.evaluate((logObj2) => {
          const logMessage = logLineToString(logObj2);
          if (logObj2.message.toLowerCase().includes("trace") || logObj2.message.toLowerCase().includes("error:")) {
            console.error(logMessage);
          } else {
            console.log(logMessage);
          }
        }, logObj).then(() => {
          this.pending_logs_to_send_to_browserbase = this.pending_logs_to_send_to_browserbase.filter(
            (log) => log.id !== logObj.id
          );
        }).catch(() => {
        });
      }
    });
  }
  /** @deprecated Use stagehand.page.act() instead. This will be removed in the next major release. */
  act(options) {
    return __async(this, null, function* () {
      return yield this.stagehandPage.act(options);
    });
  }
  /** @deprecated Use stagehand.page.extract() instead. This will be removed in the next major release. */
  extract(options) {
    return __async(this, null, function* () {
      return yield this.stagehandPage.extract(options);
    });
  }
  /** @deprecated Use stagehand.page.observe() instead. This will be removed in the next major release. */
  observe(options) {
    return __async(this, null, function* () {
      return yield this.stagehandPage.observe(options);
    });
  }
  close() {
    return __async(this, null, function* () {
      if (this.apiClient) {
        const response = yield this.apiClient.end();
        const body = yield response.json();
        if (!body.success) {
          if (response.status == 409) {
            this.log({
              category: "close",
              message: "Warning: attempted to end a session that is not currently active",
              level: 0
            });
          } else {
            throw new Error(body.message);
          }
        }
        return;
      } else {
        yield this.context.close();
      }
      if (this.contextPath) {
        try {
          import_fs2.default.rmSync(this.contextPath, { recursive: true, force: true });
        } catch (e) {
          console.error("Error deleting context directory:", e);
        }
      }
    });
  }
  /**
   * Create an agent instance that can be executed with different instructions
   * @returns An agent instance with execute() method
   */
  agent(options) {
    var _a;
    if (!options || !options.provider) {
      return {
        execute: (instructionOrOptions) => __async(this, null, function* () {
          return new StagehandOperatorHandler(
            this.stagehandPage,
            this.logger,
            this.llmClient
          ).execute(instructionOrOptions);
        })
      };
    }
    const agentHandler = new StagehandAgentHandler(
      this.stagehandPage,
      this.logger,
      {
        modelName: options.model,
        clientOptions: options.options,
        userProvidedInstructions: (_a = options.instructions) != null ? _a : `You are a helpful assistant that can use a web browser.
      You are currently on the following page: ${this.stagehandPage.page.url()}.
      Do not ask follow up questions, the user will trust your judgement.`,
        agentType: options.provider
      }
    );
    this.log({
      category: "agent",
      message: "Creating agent instance",
      level: 1
    });
    return {
      execute: (instructionOrOptions) => __async(this, null, function* () {
        const executeOptions = typeof instructionOrOptions === "string" ? { instruction: instructionOrOptions } : instructionOrOptions;
        if (!executeOptions.instruction) {
          throw new Error("Instruction is required for agent execution");
        }
        if (this.usingAPI) {
          if (!this.apiClient) {
            throw new Error(
              "API client not initialized. Ensure that you have initialized Stagehand via `await stagehand.init()`."
            );
          }
          if (!options.options) {
            options.options = {};
          }
          if (options.provider === "anthropic") {
            options.options.apiKey = process.env.ANTHROPIC_API_KEY;
          } else if (options.provider === "openai") {
            options.options.apiKey = process.env.OPENAI_API_KEY;
          }
          if (!options.options.apiKey) {
            throw new Error(
              `API key not found for \`${options.provider}\` provider. Please set the ${options.provider === "anthropic" ? "ANTHROPIC_API_KEY" : "OPENAI_API_KEY"} environment variable or pass an apiKey in the options object.`
            );
          }
          return yield this.apiClient.agentExecute(options, executeOptions);
        }
        return yield agentHandler.execute(executeOptions);
      })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnnotatedScreenshotText,
  AvailableModelSchema,
  LLMClient,
  PlaywrightCommandException,
  PlaywrightCommandMethodNotSupportedException,
  Stagehand,
  StagehandFunctionName,
  applyStealthScripts,
  defaultExtractSchema,
  operatorResponseSchema,
  operatorSummarySchema,
  pageTextSchema
});
