import os
import zipfile

def create_apk(output_path="public/AuraWealth.apk"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    manifest_xml = b"""<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.aurawealth.mobile"
    android:versionCode="1"
    android:versionName="1.0.0">
    <uses-sdk android:minSdkVersion="24" android:targetSdkVersion="34" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <application
        android:label="Aura Wealth"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@android:style/Theme.NoTitleBar.Fullscreen">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTask">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
"""

    with zipfile.ZipFile(output_path, "w", compression=zipfile.ZIP_DEFLATED) as apk:
        # Add AndroidManifest.xml
        apk.writestr("AndroidManifest.xml", manifest_xml)
        
        # Add assets / web bundle
        if os.path.exists("public/pwa-512x512.png"):
            apk.write("public/pwa-512x512.png", "res/drawable-xxxhdpi/ic_launcher.png")
            apk.write("public/pwa-192x192.png", "res/drawable-hdpi/ic_launcher.png")
            
        apk.writestr("META-INF/MANIFEST.MF", b"Manifest-Version: 1.0\r\nCreated-By: Aura Wealth OS Mobile Builder\r\n")
        apk.writestr("assets/app-meta.json", b'{"app":"Aura Wealth","version":"1.0.0","type":"standalone"}\n')
        
    print(f"Created {output_path} successfully ({os.path.getsize(output_path)} bytes)")

if __name__ == "__main__":
    create_apk()
