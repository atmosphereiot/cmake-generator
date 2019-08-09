# CMake Generator
A tool designed to generate CMakeLists files, target for cross compilation and embedded platforms.

# Usage
```
const CMakeGenerator = require('cmake-generator');

let generator = new CMakeGenerator();

generator.setCCompiler('arm-none-eabi-gcc');
generator.setCxxCompiler('arm-none-eabi-g++');
generator.setCustomLinkCommand("arm-none-eabi-gcc");

generator.setExecutableName("My_Project.elf");

generator.setAssemblyAsC();
generator.setAssemblyFileTypes([".S", ".s"]);

generator.addIncludeDirectories([
	"",
	"my/include/directory"
]);

generator.addSourceFiles(["my/dir/src1.c", "my/dir/src2.c", "my/dir/src3.s"]);
generator.addAsmFlagsOverride("-mcpu=cortex-m4 -mthumb -mfloat-abi=hard -mfpu=fpv4-sp-d16 -IROJ_DIR../ -g");
generator.addCFlagsOverride("-std=gnu99 -mcpu=cortex-m4 -mthumb -mfloat-abi=hard -mfpu=fpv4-sp-d16 -DSTM32L476xx -DUSE_HAL_DRIVER -DUSE_STM32L4XX_NUCLEO '-D__weak=__attribute__((weak))' '-D__packed=__attribute__((__packed__))' -Os -g3 -Wall -fshort-enums -fmessage-length=0 -ffunction-sections -fdata-sections -c -fmessage-length=0");
generator.addLinkFlagsOverride("-mcpu=cortex-m4 -mthumb -mfloat-abi=hard -mfpu=fpv4-sp-d16 -specs=nosys.specs -T\${PROJECT_SOURCE_DIR}/STM32L476RGTx_FLASH.ld -Wl,-Map=output.map -Wl,--gc-sections -lm");
generator.addPostBuildCommand('arm-none-eabi-objcopy -O binary "My_Project.elf" "My_Project.bin"', "\${CMAKE_CURRENT_BINARY_DIR}", "Converting to Bin...");

console.log(generator.getCMakeFile());
```