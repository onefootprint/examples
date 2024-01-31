package com.example.footprintsdkexample

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ProgressBar
import android.widget.TextView
import androidx.cardview.widget.CardView
import com.example.footprintsdkverificationexample.R
import com.footprint.android.FootprintAndroid
import com.footprint.android.FootprintAppearance
import com.footprint.android.FootprintAppearanceRules
import com.footprint.android.FootprintAppearanceTheme
import com.footprint.android.FootprintAppearanceVariables
import com.footprint.android.FootprintConfiguration
import com.footprint.android.FootprintL10n
import com.footprint.android.FootprintOptions
import com.footprint.android.FootprintSupportedLocale
import com.footprint.android.FootprintUserData

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val buttonBasicFlow: CardView = findViewById(R.id.verify_button_basic)
        val progressBarBasicFlow: ProgressBar = findViewById(R.id.progressBar_basic)
        val buttonTextBasicFlow: TextView = findViewById(R.id.textView_basic)

        val buttonBootstrapFlow: CardView = findViewById(R.id.verify_button_bootstrap)
        val progressBarBootstrapFlow: ProgressBar = findViewById(R.id.progressBar_bootstrap)
        val buttonTextBootstrapFlow: TextView = findViewById(R.id.textView_bootstrap)

        buttonBasicFlow.setOnClickListener{
            buttonTextBasicFlow.visibility = View.INVISIBLE
            progressBarBasicFlow.visibility = View.VISIBLE
            val config = FootprintConfiguration(
                redirectActivityName = "com.example.footprintsdkexample.MainActivity",
                publicKey = "pb_test_aSzwnZecnXS4faoyhxrocW",
                onComplete = {token: String ->
                    Log.d("Footprint", "The flow has completed. The validation token is $token")
                },
                onCancel = {
                    Log.d("Footprint", "The flow was canceled")
                },
                onError = {
                    Log.d("Footprint", it)
                }
            )
            FootprintAndroid.init(
                this@MainActivity,
                config = config
            )
        }

        buttonBootstrapFlow.setOnClickListener{
            buttonTextBootstrapFlow.visibility = View.INVISIBLE
            progressBarBootstrapFlow.visibility = View.VISIBLE

            val userData = FootprintUserData(
                email = "example@gmail.com",
                phoneNumber = "+15555550100",
                firstName = "Piip",
                lastName = "Foot",
                dob = "01/01/1996",
                addressLine1 = "123 Main St",
                addressLine2 = "Unit 123",
                city = "San Francisco",
                state = "CA",
                country = "US",
                zip = "12345",
                ssn9 = "343434344",
                ssn4 = "1234",
                nationality = "US",
                usLegalStatus = "citizen",
                citizenships = listOf("US", "TR"),
                visaKind = "f1",
                visaExpirationDate = "05/12/2024"
            )
            val config = FootprintConfiguration(
                redirectActivityName = "com.example.footprintsdkexample.MainActivity",
                publicKey = "pb_test_aSzwnZecnXS4faoyhxrocW",
                userData = userData,
                options = FootprintOptions(showLogo = true, showCompletionPage = true),
                l10n = FootprintL10n(locale = FootprintSupportedLocale.ES_MX),
                appearance = FootprintAppearance(
                    theme = FootprintAppearanceTheme.DARK,
                    rules = FootprintAppearanceRules(button = mapOf("transition" to "all .2s linear")),
                    variables = FootprintAppearanceVariables(borderRadius = "10px", buttonPrimaryBg = "#0C6948")
                ),
                onComplete = {token: String ->
                    Log.d("Footprint", "The flow has completed. The validation token is $token")
                },
                onCancel = {
                    Log.d("Footprint", "The flow was canceled")
                },
                onError = {
                    Log.d("Footprint", it)
                }
            )
            FootprintAndroid.init(
                this@MainActivity,
                config = config
            )
        }
    }
}