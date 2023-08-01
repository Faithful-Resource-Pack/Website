## Vanilla Launcher
Open the **Run** dialog by hitting Windows key + R, paste `%appdata%\.minecraft\resourcepacks` into the text box and hit Enter. Make sure you’ve run Minecraft at least once beforehand. A File Explorer window should pop up.
[picture]
If you get an error saying the directory doesn’t exist, paste `%appdata%\.minecraft\` into the text box instead, and create a folder named `resourcepacks` in this location.
[picture]
Once you’re in the `resourcepacks` directory, simply drag the resource pack .ZIP file there.
[picture]
Depending on the Minecraft version you might also need to reload the resource packs menu or restart the game for the pack to show up in-game.

*Note: For Minecraft versions 1.4 and below, the pack folder is named `texturepacks`. Most texture packs for these versions also require OptiFine/MCPatcher to be installed in order to work properly. Since these legacy versions use a different mod installation process than modern Minecraft, use of MultiMC or similar launchers is recommended.*

## MultiMC and Similar Launchers
Select your Minecraft instance, then in the sidebar click on **Edit instance**.
[picture]
In the window that appears, go to the **Resource packs** tab and drag the resource pack .ZIP file to there. 
[picture]
The pack should now show up in-game.
Alternatively, you can also select your instance, click the **Minecraft folder** option in the sidebar, navigate to the `resourcepacks` folder in the File Explorer window that pops up and place the resource pack file there.
[picture]

For Minecraft versions 1.4 and older, you will also need to install OptiFine or MCPatcher for most resource packs to work properly. This guide will use OptiFine for demonstration, however MCPatcher installation should work similarly.
First, download OptiFine for the desired Minecraft version [here](https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/minecraft-mods/1286605-b1-4-1-9-optifine-history). Then, in MultiMC, go to the **Versions** tab of your Minecraft instance.
[picture]
Click on **Add to Minecraft.jar**, select the OptiFine .ZIP file and confirm your selection by pressing OK. OptiFine should now appear as a jar mod above Minecraft in the versions list.
[picture]

*Note: For Minecraft versions 1.4 and below, the pack folder is named `texturepacks`.*