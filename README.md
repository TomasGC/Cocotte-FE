# Cocotte

Cocotte's aim is to simply your meal life.
You'll have to add all the recipes you know and the ingredients needed for it, then you'll be able to generate a full week of meals.

## Setup
1) Install Node.js: https://nodejs.org/en/
2) Install Angular: npm install -g @angular/cli
3) Install Angular Materials: npm install -g @angular/cli
4) Install Android studio: https://developer.android.com/studio/
5) Install Java Development Kit: https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html
6) Install Gradle: https://gradle.org/install/
7) Install Cordova: npm install -g cordova
8) If not done yet, you'll have to add new Environment Variables:
	- JAVA_HOME: C:\Program Files\Java\jdk1.8.0_301
	- ANDROID_SDK_ROOT: %USERPROFILE%\AppData\Local\Android\Sdk
	- Path => you'll have to add: 	C:\Program Files\Gradle\gradle-7.1.1\bin
									%APPDATA%\npm\node_modules\cordova\bin
9) Install packages inside folder's project: npm install

## Possible error while creating the Android app
If you get this type of error: Installed Build Tools revision 31.0.0 is corrupted. Remove and install again using the SDK Manager.
The solution isn't to remove and reinstall but to do:
	- Go in %USERPROFILE%\AppData\Local\Android\Sdk\build-tools\31.0.0
	- Duplicate d8.bat and rename the copy version to dx.bat
	- Inside dx.bat, change d8.jar to dx.jar at line 53 (under the :init)
	- Go to %USERPROFILE%\AppData\Local\Android\Sdk\build-tools\31.0.0\lib
	- Duplicate d8.jar and rename the copy dx.jar
	- Now you can retry to build the apk