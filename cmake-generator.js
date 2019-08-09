class CMakeGenerator {
    constructor() {
        this.systemName = 'Generic';
        this.systemVersion = 1;
        this.cCompiler = 'gcc';
        this.cxxCompiler = 'g++';
        this.includeDirectories = [];
        this.asmFlagsOverride = [];
        this.cFlagsOverride = [];
        this.linkFlagsOverride = [];
        this.assemblyFileTypes = [];
        this.cxxFlagsOverride = [];
        this.execName = 'Project.elf';
        this.sourceFiles = [];
        this.libraries = [];
    }

    /**
     * Set System Name
     * 
     * @param {String} name - The system name. Set to Generic by default.
     */
    setSystemName(name) {
        this.systemName = name;
    }

    /**
     * Set System Version
     * 
     * @param {Number} version - The system version. Set to 1 by default. 
     */
    setSystemVersion(version) {
        this.systemVersion = version;
    }

    /**
     * Set C Compiler
     * 
     * @param {String} compiler - C Compiler to use. Set to gcc by default.
     */
    setCCompiler(compiler) {
        this.cCompiler = compiler;
    }

    /**
     * Set C++ Compiler
     * 
     * @param {String} cxxCompiler - C++ Compiler to use. Set to g++ by default.
     */
    setCxxCompiler(cxxCompiler) {
        this.cxxCompiler = cxxCompiler;
    }

    /**
     * Add include directories
     * 
     * @param {String/Array} directories - List of directories to add. Can be an array of directory strings or a single string.
     * @param {Boolean} absolutePath - Are these directories absolute paths? If set to false, will be assumed to be relative to CMake source directory.
     */
    addIncludeDirectories(directories, absolutePath = false) {
        let currentGenerator = this;

        if (Array.isArray(directories)) {
            directories.forEach((directory) => {
                currentGenerator.includeDirectories.push({
                    'directory': directory,
                    'absolute': absolutePath
                });
            });
        } else {
            currentGenerator.includeDirectories.push({
                'directory': directories,
                'absolute': absolutePath
            });
        }
    }

    /**
     * Override default CMake asm flags with custom flags.
     * 
     * @param {String/Array} flags - Assembly flags to override. Will override ALL assembly flags. Can either be a list of flags or a single flag. 
     */
    addAsmFlagsOverride(flags) {
        if(Array.isArray(flags)) {
            this.asmFlagsOverride = this.asmFlagsOverride.concat(flags);
        } else {
            this.asmFlagsOverride.push(flags);
        }
    }

    /**
     * Override default CMake C flags with custom flags.
     * 
     * @param {String/Array} flags - C flags to override. Will override ALL C flags. Can either be a list of flags or a single flag. 
     */
    addCFlagsOverride(flags) {
        if(Array.isArray(flags)) {
            this.cFlagsOverride = this.cFlagsOverride.concat(flags);
        } else {
            this.cFlagsOverride.push(flags);
        }
    }

    /**
     * Override default CMake C++ flags with custom flags.
     * 
     * @param {String/Array} flags - C++ flags to override. Will override ALL C++ flags. Can either be a list of flags or a single flag. 
     */
    addCxxFlagsOverride(flags) {
        if(Array.isArray(flags)) {
            this.cxxFlagsOverride = this.cxxFlagsOverride.concat(flags);
        } else {
            this.cxxFlagsOverride.push(flags);
        }
    }

    /**
     * Override default CMake linkerflags with custom flags
     * 
     * @param {String/Array} flags - Linker flags to override. Will override ALL linker flags. Can either be a list of flags or a single flag. 
     */
    addLinkFlagsOverride(flags) {
        if(Array.isArray(flags)) {
            this.linkFlagsOverride = this.linkFlagsOverride.concat(flags);
        } else {
            this.linkFlagsOverride.push(flags);
        }
    }

    /**
     * Use custom command to link objects
     * 
     * @param {String} command Use a custom command to link
     */
    setCustomLinkCommand(command) {
        this.linkCmd = command;
    }

    /**
     * Set executable filename
     * 
     * @param {String} name Executable file name
     */
    setExecutableName(name) {
        this.execName = name;
    }

    /**
     * Add source files to be compiled
     * 
     * @param {String/Array} sourceFiles Source files to add to executable. Can either be a single source file or an array of source files.
     * @param {*} absolutePath Are these sources absolute paths? If set to false, will be assumed to be relative to CMake source directory.
     */
    addSourceFiles(sourceFiles, absolutePath = false) {
        let currentGenerator = this;
        if (Array.isArray(sourceFiles)) {
            sourceFiles.forEach((source) => {
                currentGenerator.sourceFiles.push({
                    'source': source,
                    'absolute': absolutePath
                });
            });
        } else {
            currentGenerator.sourceFiles.push({
                'source': sourceFiles,
                'absolute': absolutePath
            });
        }
    }

    /**
     * Set option for assembly files to be compiled with the C Compiler
     */
    setAssemblyAsC() {
        this.assemblyAsC = true;
    }

    /**
     * Set filetypes that are considered to be "assembly" files
     * 
     * @param {String/Array} types - Filetypes considered to be assembly files. Must be set if setAssemblyAsC is called. Can either be a list of types or a single type.
     */
    setAssemblyFileTypes(types) {
        if(Array.isArray(types)) {
            this.assemblyFileTypes = this.assemblyFileTypes.concat(types);
        } else {
            this.assemblyFileTypes.push(types);
        }
    }

    /**
     * Add libraries to be linked with executable.
     * 
     * @param {String/Array} libraries Libraries to link. Can either be a list of libraries or a single library string. 
     * @param {Boolean} absolutePath Are all of these library paths absolute? If not, will be assumed to be relative to the source directory.
     */
    addLinkLibraries(libraries, absolutePath = false) {
        let currentGenerator = this;
        if (Array.isArray(libraries)) {
            libraries.forEach((lib) => {
                currentGenerator.libraries.push({
                    'library': lib,
                    'absolute': absolutePath
                });
            });
        } else {
            currentGenerator.libraries.push({
                'library': libraries,
                'absolute': absolutePath
            });
        }
    }

    /**
     * Add post build command
     * 
     * @param {String} command Post build command to execute
     * @param {String} workingDir Working directory for command. OPTIONAL
     * @param {String} comment Comment to be displayed to user when command runs. OPTIONAL
     */
    addPostBuildCommand(command, workingDir, comment) {
        if(this.postBuildCommand === undefined) {
            this.postBuildCommand = [];
        }

        let cmdObj = {};
        cmdObj = { 'command': command };

        if (workingDir) {
            cmdObj.workingDir = workingDir;
        }

        if (comment) {
            cmdObj.comment = comment;
        }

        this.postBuildCommand.push(cmdObj);
    }

    /**
     * Generate and return CMakeLists file
     */
    getCMakeFile() {
        let currentGenerator = this;
        let cMakeFile = `
SET(CMAKE_SYSTEM_NAME ${this.systemName})
SET(CMAKE_SYSTEM_VERSION ${this.systemVersion})

SET(CMAKE_C_COMPILER ${this.cCompiler})
SET(CMAKE_CXX_COMPILER ${this.cxxCompiler})

SET(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
SET(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY NEVER)
SET(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE NEVER)

`
        cMakeFile += this._getIncludeDirectories();
        cMakeFile += this._getFlags('CMAKE_ASM_FLAGS', this.asmFlagsOverride);
        cMakeFile += this._getFlags('CMAKE_C_FLAGS', this.cFlagsOverride);
        cMakeFile += this._getFlags('CMAKE_CXX_FLAGS', this.cxxFlagsOverride);

        if (this.linkFlagsOverride.length > 0) {
            cMakeFile += this._getFlags('CMAKE_SHARED_LIBRARY_LINK_C_FLAGS', this.linkFlagsOverride);
            cMakeFile += this._getFlags('CMAKE_SHARED_LIBRARY_LINK_CXX_FLAGS', this.linkFlagsOverride);
        }

        if (this.linkCmd) {
            cMakeFile += `set(CMAKE_C_LINK_EXECUTABLE "${this.linkCmd} <LINK_FLAGS> <OBJECTS> -o <TARGET> <LINK_LIBRARIES>")\n\n`
        }

        cMakeFile += this._processSources();

        cMakeFile += this._getPostBuild();

        cMakeFile += this._getLibraries();

        return cMakeFile;
    }
    /* PRIVATE FUNCTIONS */
    _getIncludeDirectories() {
        let cMakeFile = '';
        this.includeDirectories.forEach((directory) => {
            if(!directory.absolute) {
                cMakeFile += `include_directories(\${PROJECT_SOURCE_DIR}/${directory.directory})\n`;
            } else {
                cMakeFile += `include_directories(${directory.directory})\n`;
            }
        });

        return cMakeFile + '\n\n';
    }

    _getFlags(type, flags) {
        let cMakeFile = '';

        if(flags.length > 0) {
            cMakeFile += `SET(${type} "${flags.join(" ")}")\n\n`;
        }

        return cMakeFile;
    }

    _processSources() {
        let cMakeFile = '';
        let currentGenerator = this;
        let sourcesEscaped = [];

        this.sourceFiles.forEach(function (source) {

            sourcesEscaped.push("\"" + source.source + "\"");
            
            if (currentGenerator.assemblyAsC && currentGenerator.assemblyFileTypes.length > 0) {
                // If the source file is an assembly file
                currentGenerator.assemblyFileTypes.forEach(function (fileType) {
                    if (source.source.endsWith(fileType)) {
                        cMakeFile += `set_property(SOURCE ${source.source} PROPERTY LANGUAGE C)\n`
                    }
                });
            }
        });


        cMakeFile += `add_executable(${this.execName} ${sourcesEscaped.join(" ")})\n\n`;
        return cMakeFile + '\n\n';
    }

    _getPostBuild() {
        let currentGenerator = this;
        let cMakeFile = '';
        currentGenerator.postBuildCommand.forEach((command) => {
            cMakeFile += `add_custom_command(TARGET ${currentGenerator.execName} POST_BUILD COMMAND ${command.command}`;

            if (command.workingDir) {
                cMakeFile += ` WORKING_DIRECTORY ${command.workingDir}`;
            }

            if (command.comment) {
                cMakeFile += ` COMMENT "${command.comment}"`;
            }

            cMakeFile += `)\n\n`;
        });

        return cMakeFile;
    }

    _getLibraries() {
        var cMakeFile = '';
        let currentGenerator = this;
        currentGenerator.libraries.forEach((library) => {
            if(library.absolute) {
                cMakeFile += `target_link_libraries(${currentGenerator.execName} ${library.library})\n`;
            } else {
                cMakeFile += `target_link_libraries(${currentGenerator.execName} \${CMAKE_SOURCE_DIR}/${library.library})\n`;
            }
        });

        return cMakeFile;
    }
}

module.exports = CMakeGenerator;
