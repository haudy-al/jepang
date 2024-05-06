package com.jepang.myapp;

// import com.getcapacitor.BridgeActivity;

// public class MainActivity extends BridgeActivity {}

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth; // Import GoogleAuth plugin

public class MainActivity extends BridgeActivity {

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.registerPlugin(GoogleAuth.class);
    }
}