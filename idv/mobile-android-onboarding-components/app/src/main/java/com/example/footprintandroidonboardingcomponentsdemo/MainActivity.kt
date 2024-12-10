package com.example.footprintandroidonboardingcomponentsdemo

import android.app.Activity
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.onefootprint.native_onboarding_components.Footprint
import com.onefootprint.native_onboarding_components.hosted.FootprintHosted
import com.onefootprint.native_onboarding_components.models.FootprintAuthMethods
import com.onefootprint.native_onboarding_components.models.FootprintException
import com.onefootprint.native_onboarding_components.models.OverallOutcome
import com.onefootprint.native_onboarding_components.models.SandboxOutcome
import com.onefootprint.native_onboarding_components.models.VaultData
import kotlinx.coroutines.launch
import org.openapitools.client.models.DataIdentifier

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            OnboardingComponents(context = this)
        }
    }
}


enum class Step {
    INIT,
    IDENTIFY_AUTH_TOKEN,
    IDENTIFY_EMAIL_PHONE,
    IDENTIFY_VERIFY,
    BASIC_INFO,
    ADDRESS,
    SSN,
    COMPLETE,
    ERROR
}

@Composable
fun OnboardingComponents(context: Activity) {
    var currentStep by rememberSaveable { mutableStateOf(Step.INIT) }

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        when (currentStep) {
            Step.INIT -> {
                Init { newStep ->
                    currentStep = newStep
                }
            }

            Step.IDENTIFY_EMAIL_PHONE -> {
                IdentifyEmailPhone(
                    setNextStep = { newStep ->
                        currentStep = newStep
                    },
                    context = context
                )
            }

            Step.IDENTIFY_AUTH_TOKEN -> {
                IdentifyAuthToken(
                    setNextStep = { newStep ->
                        currentStep = newStep
                    },
                    context = context
                )
            }

            Step.IDENTIFY_VERIFY -> {
                VerificationCode { newStep ->
                    currentStep = newStep
                }
            }

            Step.BASIC_INFO -> {
                BasicInfo { newStep ->
                    currentStep = newStep
                }
            }

            Step.ADDRESS -> {
                Address { newStep ->
                    currentStep = newStep
                }
            }

            Step.SSN -> {
                SSN { newStep ->
                    currentStep = newStep
                }
            }

            Step.COMPLETE -> {
                Complete(
                    context = context
                )
            }

            else -> {
                Text("Onboarding Components Demo Completed. Step: $currentStep")
            }
        }
    }
}


@Composable
fun Init(
    setNextStep: (step: Step) -> Unit
) {
    val coroutineScope = rememberCoroutineScope() // Creates a coroutine scope for this composable

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Button(
            onClick = {
                coroutineScope.launch {
                    val authRequirement = Footprint.initialize(
                        publicKey = "pb_test_Nza8oVYDBlrIqrQrNCbKRB",
//                        authToken = "utok_MhyAZwlmbZVLaxH6Kr7aeBe564fi13buhp",
                        sandboxOutcome = SandboxOutcome(
                            overallOutcome = OverallOutcome.FAIL
                        )
                    )

                    if (authRequirement.requiresAuth) {
                        when (authRequirement.authMethod) {
                            FootprintAuthMethods.EMAIL_PHONE -> {
                                setNextStep(Step.IDENTIFY_EMAIL_PHONE)
                            }

                            FootprintAuthMethods.AUTH_TOKEN -> {
                                setNextStep(Step.IDENTIFY_AUTH_TOKEN)
                            }

                            else -> {
                                // Should never happen
                                setNextStep(Step.ERROR)
                            }
                        }
                    } else {
                        setNextStep(Step.BASIC_INFO)
                    }
                }
            }
        ) {
            Text("Start Onboarding Components Demo")
        }
    }
}

@Composable
fun IdentifyEmailPhone(
    setNextStep: (step: Step) -> Unit,
    context: Activity
) {
    var email by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var emailError by remember { mutableStateOf(false) }
    var phoneError by remember { mutableStateOf(false) }
    val coroutineScope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        TextField(
            value = email,
            onValueChange = {
                email = it
                emailError = it.isBlank() // Set error state when email is empty
            },
            label = { Text("Email") },
            placeholder = { Text("Enter your email") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = emailError // Trigger error state
        )

        if (emailError) {
            Text(
                text = "Email is required",
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        TextField(
            value = phone,
            onValueChange = {
                phone = it
                phoneError = it.isBlank() // Set error state when phone is empty
            },
            label = { Text("Phone") },
            placeholder = { Text("Enter your phone number") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Phone),
            isError = phoneError // Trigger error state
        )

        if (phoneError) {
            Text(
                text = "Phone number is required",
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = {
                coroutineScope.launch {
                    // Validate email and phone fields before proceeding
                    emailError = email.isBlank()
                    phoneError = phone.isBlank()

                    if (email.isNotBlank() && phone.isNotBlank()) {
                        try {
                            val createChallengeKind = Footprint.createChallenge(
                                email = email,
                                phoneNumber = phone
                            )
                            // Possible values for challengeKind: sms, sms_link, biometric, email. But for onboarding components, it will only be email or sms
                            println("Challenge Kind: $createChallengeKind")
                            setNextStep(Step.IDENTIFY_VERIFY)
                        } catch (e: FootprintException) {
                            when (e.kind) {
                                FootprintException.ErrorKind.INLINE_OTP_NOT_SUPPORTED -> {
                                    FootprintHosted.launchIdentify(
                                        context = context,
                                        email = email,
                                        phone = phone,
                                        onAuthenticated = { response ->
                                            println("Verification successful: ${response.validationToken}")
                                            // Store the validation token in view model in case you need it later
                                            // This token can be used to get fp_id
                                            setNextStep(Step.BASIC_INFO)
                                        },
                                        onError = { error ->
                                            println("Error in hosted identify: $error")
                                        },
                                        onCancel = {
                                            println("User canceled hosted identify")
                                        }
                                    )
                                }

                                else -> {
                                    println("Error creating email phone challenge: ${e.message}")
                                }
                            }
                        } catch (e: Exception) {
                            println("Error creating email phone challenge: ${e.message}")
                        }
                    } else {
                        println("Email or Phone is invalid")
                    }
                }
            }
        ) {
            Text("Next")
        }
    }
}

@Composable
fun IdentifyAuthToken(
    setNextStep: (step: Step) -> Unit,
    context: Activity
) {
    LaunchedEffect(Unit) {
        try {
            val createChallengeKind =
                Footprint.createChallenge() // No need to pass email or phone for auth token
            // Possible values for challengeKind: sms, sms_link, biometric, email. But for onboarding components, it will only be email or sms
            println("Challenge Kind: $createChallengeKind")
            setNextStep(Step.IDENTIFY_VERIFY)
        } catch (e: FootprintException) {
            when (e.kind) {
                FootprintException.ErrorKind.INLINE_OTP_NOT_SUPPORTED -> {
                    FootprintHosted.launchIdentify(
                        context = context,
                        onAuthenticated = { response ->
                            println("Verification successful: ${response.validationToken}")
                            // Store the validation token in view model in case you need it later
                            // This token can be used to get fp_id
                            setNextStep(Step.BASIC_INFO)
                        },
                        onError = { error ->
                            println("Error in hosted identify: $error")
                        },
                        onCancel = {
                            println("User canceled hosted identify")
                        }
                    )
                }

                else -> {
                    println("Error creating email phone challenge: ${e.message}")
                }
            }
        } catch (e: Exception) {
            println("Error creating email phone challenge: ${e.message}")
        }
    }

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        CircularProgressIndicator()
    }
}

@Composable
fun VerificationCode(
    setNextStep: (step: Step) -> Unit
) {
    var code by remember { mutableStateOf("") }
    var isFailed by remember { mutableStateOf(false) }
    var isBlank by remember { mutableStateOf(false) }
    val coroutineScope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        TextField(
            value = code,
            onValueChange = {
                code = it
                // Clear errors when the user starts typing
                if (it.isNotEmpty()) {
                    isFailed = false
                    isBlank = false
                }
            },
            label = { Text("Verification Code") },
            placeholder = { Text("Enter the verification code") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = isBlank || isFailed // Show error when blank or failed
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Show error message if code is blank or invalid
        if (isFailed || isBlank) {
            Text(
                color = MaterialTheme.colorScheme.error,
                text = if (isBlank) "Verification code cannot be blank" else "Invalid verification code. Please try again.",
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = {
                coroutineScope.launch {
                    if (code.isNotBlank()) {
                        try {
                            // Attempt verification
                            Footprint.verify(code)
                            setNextStep(Step.BASIC_INFO)
                        } catch (e: Exception) {
                            // Mark as failed if verification fails
                            isFailed = true
                            println("Error verifying challenge: ${e.message}")
                        }
                    } else {
                        // Mark as blank if no code entered
                        isBlank = true
                        println("Verification code is invalid")
                    }
                }
            }
        ) {
            Text("Verify")
        }
    }
}

@Composable
fun BasicInfo(
    setNextStep: (step: Step) -> Unit
) {
    var firstName by remember { mutableStateOf("") }
    var middleName by remember { mutableStateOf("") }
    var lastName by remember { mutableStateOf("") }
    var dob by remember { mutableStateOf("") }

    var firstNameError by remember { mutableStateOf(false) }
    var lastNameError by remember { mutableStateOf(false) }
    var dobError by remember { mutableStateOf(false) }
    var middleNameError by remember { mutableStateOf(false) }

    var firstNameErrorMessage by remember { mutableStateOf("") }
    var lastNameErrorMessage by remember { mutableStateOf("") }
    var middleNameErrorMessage by remember { mutableStateOf("") }
    var dobErrorMessage by remember { mutableStateOf("") }
    var generalErrorMessage by remember { mutableStateOf("") } // Added for generic error message

    val coroutineScope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        try {
            val vaultData = Footprint.getVaultData(
                listOf(
                    DataIdentifier.idFirstName,
                    DataIdentifier.idMiddleName,
                    DataIdentifier.idLastName,
                    DataIdentifier.idDob
                )
            ).asMap()
            firstName =
                if (vaultData[DataIdentifier.idFirstName] is String) vaultData[DataIdentifier.idFirstName] as String else ""
            middleName =
                if (vaultData[DataIdentifier.idMiddleName] is String) vaultData[DataIdentifier.idMiddleName] as String else ""
            lastName =
                if (vaultData[DataIdentifier.idLastName] is String) vaultData[DataIdentifier.idLastName] as String else ""
            dob =
                if (vaultData[DataIdentifier.idDob] is String) vaultData[DataIdentifier.idDob] as String else ""
        } catch (e: Exception) {
            println("Error retrieving vault data: ${e.message}")
        }

        // Get requirements
        // This is an example of how to get requirements for the user
        // For demonstration purposes, we will print the requirements to the console
        // The requirements response will change during the flow as you collect more data and complete the requirements
        // So, you can call this function at any point in the flow to get the latest requirements
        try {
            val requirementsResponse = Footprint.getRequirements()
            println("Has missing requirements: ${requirementsResponse.requirements.isMissing}")
            println("Is requirements completed: ${requirementsResponse.requirements.isCompleted}")
            println("Missing fields: ${requirementsResponse.fields.missing}")
            println("Collected fields: ${requirementsResponse.fields.collected}")
            println("Optional fields: ${requirementsResponse.fields.optional}")
            println("Can updated user data: ${requirementsResponse.canUpdateUserData}")
            println("Can process inline OTP: ${requirementsResponse.canProcessInline}")
        } catch (e: Exception) {
            println("Error getting requirements: ${e.message}")
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // First Name Field
        TextField(
            value = firstName,
            onValueChange = {
                firstName = it
                firstNameError = it.isBlank() // Set error when first name is blank
                firstNameErrorMessage = "" // Clear the error message on change
            },
            label = { Text("First Name") },
            placeholder = { Text("Enter your first name") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = firstNameError // Show error if blank
        )

        if (firstNameError) {
            Text(
                text = firstNameErrorMessage.ifEmpty { "First Name is required" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Middle Name Field (Optional)
        TextField(
            value = middleName,
            onValueChange = {
                middleName = it
                middleNameError =
                    it.isBlank() && middleName.isNotEmpty() // Error if middle name is set but empty
                middleNameErrorMessage = "" // Clear the error message on change
            },
            label = { Text("Middle Name") },
            placeholder = { Text("Enter your middle name") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = middleNameError // Show error if middle name is empty
        )

        if (middleNameError) {
            Text(
                text = middleNameErrorMessage.ifEmpty { "Middle Name cannot be empty if provided" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Last Name Field
        TextField(
            value = lastName,
            onValueChange = {
                lastName = it
                lastNameError = it.isBlank() // Set error when last name is blank
                lastNameErrorMessage = "" // Clear the error message on change
            },
            label = { Text("Last Name") },
            placeholder = { Text("Enter your last name") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = lastNameError // Show error if blank
        )

        if (lastNameError) {
            Text(
                text = lastNameErrorMessage.ifEmpty { "Last Name is required" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Date of Birth Field
        TextField(
            value = dob,
            onValueChange = {
                dob = it
                dobError = it.isBlank() // Set error when dob is blank
                dobErrorMessage = "" // Clear the error message on change
            },
            label = { Text("Date of Birth") },
            placeholder = { Text("Enter your date of birth") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = dobError // Show error if blank
        )

        if (dobError) {
            Text(
                text = dobErrorMessage.ifEmpty { "Date of Birth is required" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // General error message (fallback for unexpected errors)
        if (generalErrorMessage.isNotEmpty()) {
            Text(
                text = generalErrorMessage,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        // Submit Button
        Button(
            onClick = {
                coroutineScope.launch {
                    // Check if required fields (firstName, lastName, dob) are filled
                    firstNameError = firstName.isBlank()
                    lastNameError = lastName.isBlank()
                    dobError = dob.isBlank()
                    middleNameError = middleName.isBlank() && middleName.isNotEmpty()

                    firstNameErrorMessage = if (firstNameError) "First Name is required" else ""
                    lastNameErrorMessage = if (lastNameError) "Last Name is required" else ""
                    dobErrorMessage = if (dobError) "Date of Birth is required" else ""
                    middleNameErrorMessage =
                        if (middleNameError) "Middle Name cannot be empty if provided" else ""
                    generalErrorMessage = "" // Reset general error message

                    if (!firstNameError && !lastNameError && !dobError && !middleNameError) {
                        try {
                            Footprint.vault(
                                VaultData(
                                    mapOf(
                                        DataIdentifier.idFirstName to firstName,
                                        DataIdentifier.idMiddleName to middleName,
                                        DataIdentifier.idLastName to lastName,
                                        DataIdentifier.idDob to dob
                                    )
                                )
                            )
                            setNextStep(Step.ADDRESS)
                        } catch (e: FootprintException) {
                            println("Error updating basic info: ${e.message}, ${e.context}")

                            // Handle specific errors from vaulting
                            val fnError = e.context?.get(DataIdentifier.idFirstName.value)
                            val lnError = e.context?.get(DataIdentifier.idLastName.value)
                            val mnError = e.context?.get(DataIdentifier.idMiddleName.value)
                            val birthdayError = e.context?.get(DataIdentifier.idDob.value)

                            // Set field-specific error messages if available
                            if (!fnError.isNullOrEmpty()) {
                                firstNameError = true
                                firstNameErrorMessage = fnError
                            }
                            if (!lnError.isNullOrEmpty()) {
                                lastNameError = true
                                lastNameErrorMessage = lnError
                            }
                            if (!mnError.isNullOrEmpty()) {
                                middleNameError = true
                                middleNameErrorMessage = mnError
                            }
                            if (!birthdayError.isNullOrEmpty()) {
                                dobError = true
                                dobErrorMessage = birthdayError
                            }

                            // Fallback for other errors
                            if (fnError == null && lnError == null && mnError == null && birthdayError == null) {
                                generalErrorMessage =
                                    "An unexpected error occurred. Please try again later."
                            }
                        } catch (e: Exception) {
                            println("Error updating basic info: ${e.message}")
                            generalErrorMessage =
                                "An unexpected error occurred. Please try again later."
                        }
                    } else {
                        println("First Name, Last Name, or DOB is invalid")
                    }
                }
            }
        ) {
            Text("Next")
        }
    }
}


@Composable
fun Address(
    setNextStep: (step: Step) -> Unit
) {
    var addressLine1 by remember { mutableStateOf("") }
    var addressLine2 by remember { mutableStateOf("") }
    var city by remember { mutableStateOf("") }
    var state by remember { mutableStateOf("") }
    var zip by remember { mutableStateOf("") }
    var country by remember { mutableStateOf("") }

    // Error states for fields
    var addressLine1Error by remember { mutableStateOf(false) }
    var cityError by remember { mutableStateOf(false) }
    var stateError by remember { mutableStateOf(false) }
    var zipError by remember { mutableStateOf(false) }
    var countryError by remember { mutableStateOf(false) }

    // Error messages
    var addressLine1ErrorMessage by remember { mutableStateOf("") }
    var cityErrorMessage by remember { mutableStateOf("") }
    var stateErrorMessage by remember { mutableStateOf("") }
    var zipErrorMessage by remember { mutableStateOf("") }
    var countryErrorMessage by remember { mutableStateOf("") }

    var generalErrorMessage by remember { mutableStateOf("") } // For fallback error messages

    val coroutineScope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        try {
            val vaultData = Footprint.getVaultData(
                listOf(
                    DataIdentifier.idAddressLine1,
                    DataIdentifier.idAddressLine2,
                    DataIdentifier.idCity,
                    DataIdentifier.idState,
                    DataIdentifier.idZip,
                    DataIdentifier.idCountry
                )
            ).asMap()
            addressLine1 =
                if (vaultData[DataIdentifier.idAddressLine1] is String) vaultData[DataIdentifier.idAddressLine1] as String else ""
            addressLine2 =
                if (vaultData[DataIdentifier.idAddressLine2] is String) vaultData[DataIdentifier.idAddressLine2] as String else ""
            city =
                if (vaultData[DataIdentifier.idCity] is String) vaultData[DataIdentifier.idCity] as String else ""
            state =
                if (vaultData[DataIdentifier.idState] is String) vaultData[DataIdentifier.idState] as String else ""
            zip =
                if (vaultData[DataIdentifier.idZip] is String) vaultData[DataIdentifier.idZip] as String else ""
            country =
                if (vaultData[DataIdentifier.idCountry] is String) vaultData[DataIdentifier.idCountry] as String else ""
        } catch (e: Exception) {
            println("Error retrieving vault data: ${e.message}")
        }

        // Get requirements
        // This is an example of how to get requirements for the user
        // For demonstration purposes, we will print the requirements to the console
        // The requirements response will change during the flow as you collect more data and complete the requirements
        // So, you can call this function at any point in the flow to get the latest requirements
        try {
            val requirementsResponse = Footprint.getRequirements()
            println("Has missing requirements: ${requirementsResponse.requirements.isMissing}")
            println("Is requirements completed: ${requirementsResponse.requirements.isCompleted}")
            println("Missing fields: ${requirementsResponse.fields.missing}")
            println("Collected fields: ${requirementsResponse.fields.collected}")
            println("Optional fields: ${requirementsResponse.fields.optional}")
            println("Can updated user data: ${requirementsResponse.canUpdateUserData}")
            println("Can process inline OTP: ${requirementsResponse.canProcessInline}")
        } catch (e: Exception) {
            println("Error getting requirements: ${e.message}")
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Address Line 1 Field
        TextField(
            value = addressLine1,
            onValueChange = {
                addressLine1 = it
                addressLine1Error = it.isBlank() // Set error when address line 1 is blank
                addressLine1ErrorMessage = "" // Clear the error message on change
            },
            label = { Text("Address Line 1") },
            placeholder = { Text("Enter your address line 1") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = addressLine1Error // Show error if blank
        )

        if (addressLine1Error) {
            Text(
                text = addressLine1ErrorMessage.ifEmpty { "Address Line 1 is required" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Address Line 2 Field (Optional)
        TextField(
            value = addressLine2,
            onValueChange = {
                addressLine2 = it
            },
            label = { Text("Address Line 2 (Optional)") },
            placeholder = { Text("Enter your address line 2") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true
        )

        Spacer(modifier = Modifier.height(16.dp))

        // City Field
        TextField(
            value = city,
            onValueChange = {
                city = it
                cityError = it.isBlank() // Set error when city is blank
                cityErrorMessage = "" // Clear the error message on change
            },
            label = { Text("City") },
            placeholder = { Text("Enter your city") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = cityError // Show error if blank
        )

        if (cityError) {
            Text(
                text = cityErrorMessage.ifEmpty { "City is required" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // State Field
        TextField(
            value = state,
            onValueChange = {
                state = it
                stateError = it.isBlank() // Set error when state is blank
                stateErrorMessage = "" // Clear the error message on change
            },
            label = { Text("State") },
            placeholder = { Text("Enter your state") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = stateError // Show error if blank
        )

        if (stateError) {
            Text(
                text = stateErrorMessage.ifEmpty { "State is required" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Zip Code Field
        TextField(
            value = zip,
            onValueChange = {
                zip = it
                zipError = it.isBlank() // Set error when zip is blank
                zipErrorMessage = "" // Clear the error message on change
            },
            label = { Text("Zip Code") },
            placeholder = { Text("Enter your zip code") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = zipError // Show error if blank
        )

        if (zipError) {
            Text(
                text = zipErrorMessage.ifEmpty { "Zip Code is required" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Country Field
        TextField(
            value = country,
            onValueChange = {
                country = it
                countryError = it.isBlank() // Set error when country is blank
                countryErrorMessage = "" // Clear the error message on change
            },
            label = { Text("Country") },
            placeholder = { Text("Enter your country") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = countryError // Show error if blank
        )

        if (countryError) {
            Text(
                text = countryErrorMessage.ifEmpty { "Country is required" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // General error message (fallback for unexpected errors)
        if (generalErrorMessage.isNotEmpty()) {
            Text(
                text = generalErrorMessage,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        // Submit Button
        Button(
            onClick = {
                coroutineScope.launch {
                    // Check if required fields (addressLine1, city, state, zip, country) are filled
                    addressLine1Error = addressLine1.isBlank()
                    cityError = city.isBlank()
                    stateError = state.isBlank()
                    zipError = zip.isBlank()
                    countryError = country.isBlank()

                    addressLine1ErrorMessage =
                        if (addressLine1Error) "Address Line 1 is required" else ""
                    cityErrorMessage = if (cityError) "City is required" else ""
                    stateErrorMessage = if (stateError) "State is required" else ""
                    zipErrorMessage = if (zipError) "Zip Code is required" else ""
                    countryErrorMessage = if (countryError) "Country is required" else ""

                    generalErrorMessage = "" // Reset general error message

                    if (!addressLine1Error && !cityError && !stateError && !zipError && !countryError) {
                        try {
                            Footprint.vault(
                                VaultData(
                                    mapOf(
                                        DataIdentifier.idAddressLine1 to addressLine1,
                                        DataIdentifier.idAddressLine2 to addressLine2,
                                        DataIdentifier.idCity to city,
                                        DataIdentifier.idState to state,
                                        DataIdentifier.idZip to zip,
                                        DataIdentifier.idCountry to country
                                    )
                                )
                            )
                            setNextStep(Step.SSN)
                        } catch (e: FootprintException) {
                            println("Error updating address info: ${e.message}, ${e.context}")

                            // Handle specific errors from vaulting
                            val addressLine1ErrorMsg =
                                e.context?.get(DataIdentifier.idAddressLine1.value)
                            val cityErrorMsg = e.context?.get(DataIdentifier.idCity.value)
                            val stateErrorMsg = e.context?.get(DataIdentifier.idState.value)
                            val zipErrorMsg = e.context?.get(DataIdentifier.idZip.value)
                            val countryErrorMsg = e.context?.get(DataIdentifier.idCountry.value)

                            // Set field-specific error messages if available
                            if (!addressLine1ErrorMsg.isNullOrEmpty()) {
                                addressLine1Error = true
                                addressLine1ErrorMessage = addressLine1ErrorMsg
                            }
                            if (!cityErrorMsg.isNullOrEmpty()) {
                                cityError = true
                                cityErrorMessage = cityErrorMsg
                            }
                            if (!stateErrorMsg.isNullOrEmpty()) {
                                stateError = true
                                stateErrorMessage = stateErrorMsg
                            }
                            if (!zipErrorMsg.isNullOrEmpty()) {
                                zipError = true
                                zipErrorMessage = zipErrorMsg
                            }
                            if (!countryErrorMsg.isNullOrEmpty()) {
                                countryError = true
                                countryErrorMessage = countryErrorMsg
                            }

                            // Fallback for other errors
                            if (addressLine1ErrorMsg == null && cityErrorMsg == null && stateErrorMsg == null && zipErrorMsg == null && countryErrorMsg == null) {
                                generalErrorMessage =
                                    "An unexpected error occurred. Please try again later."
                            }
                        } catch (e: Exception) {
                            println("Error updating address info: ${e.message}")
                            generalErrorMessage =
                                "An unexpected error occurred. Please try again later."
                        }
                    } else {
                        println("Address fields are invalid")
                    }
                }
            }
        ) {
            Text("Next")
        }
    }
}

@Composable
fun SSN(
    setNextStep: (step: Step) -> Unit
) {
    var ssn by remember { mutableStateOf("") }
    var ssnError by remember { mutableStateOf(false) }
    var ssnErrorMessage by remember { mutableStateOf("") }

    val coroutineScope = rememberCoroutineScope()

    // Function to validate SSN format (***-**-****)
    fun isValidSSN(input: String): Boolean {
        // Remove any non-digit characters and check if the length is exactly 9
        val cleanInput = input.replace(Regex("[^0-9]"), "")
        return cleanInput.length == 9
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // SSN Field
        TextField(
            value = ssn,
            onValueChange = { newValue ->
                ssn = newValue
                ssnError = false // Reset error on input change
                ssnErrorMessage = "" // Reset error message
            },
            label = { Text("SSN") },
            placeholder = { Text("Enter SSN (***-**-****)") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = ssnError // Show error if SSN is invalid
        )

        if (ssnError) {
            Text(
                text = ssnErrorMessage.ifEmpty { "SSN is required and must be in the format ***-**-****" },
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.align(Alignment.Start)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Submit Button
        Button(
            onClick = {
                coroutineScope.launch {
                    ssnError = !isValidSSN(ssn) // Validate the SSN format
                    ssnErrorMessage = if (ssnError) {
                        "SSN is required and must be in the format ***-**-****"
                    } else {
                        ""
                    }

                    if (!ssnError) {
                        try {
                            // You can use the SSN in the vaulting process, like in other screens
                            Footprint.vault(
                                VaultData(
                                    mapOf(
                                        DataIdentifier.idSsn9 to ssn
                                    )
                                )
                            )
                            setNextStep(Step.COMPLETE)
                        } catch (e: FootprintException) {
                            println("Error updating SSN info: ${e.message}")
                            ssnErrorMessage =
                                "There was an issue processing your SSN. Please try again."
                        } catch (e: Exception) {
                            println("Unexpected error: ${e.message}")
                            ssnErrorMessage =
                                "An unexpected error occurred. Please try again later."
                        }
                    }
                }
            }
        ) {
            Text("Next")
        }
    }
}


@Composable
fun Complete(
    context: Activity
) {
    var validationToken by remember { mutableStateOf("") }
    var isOnboardingSuccess by remember { mutableStateOf(false) }
    var failureMessage by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        try {
            val result = Footprint.process()
            validationToken = result
            isOnboardingSuccess = true
            isLoading = false
        } catch (e: FootprintException) {
            when (e.kind) {
                FootprintException.ErrorKind.INLINE_PROCESS_NOT_SUPPORTED -> {
                    // If inline process is not supported, launch hosted handoff
                    // Note you call Footprint.getRequirements().canProcessInline to check if inline process is supported before calling Footprint.process()
                    FootprintHosted.handoff(
                        context = context,
                        onComplete = { token ->
                            validationToken = token
                            isOnboardingSuccess = true
                            isLoading = false
                        },
                        onError = { error ->
                            isOnboardingSuccess = false
                            failureMessage = error
                            isLoading = false
                        },
                        onCancel = {
                            isOnboardingSuccess = false
                            failureMessage = "User canceled hosted handoff"
                            isLoading = false
                        }
                    )
                }

                else -> {
                    isOnboardingSuccess = false
                    failureMessage = e.message ?: "An unexpected error occurred."
                    isLoading = false
                }
            }
        } catch (e: Exception) {
            isOnboardingSuccess = false
            failureMessage = e.message ?: "An unexpected error occurred."
            isLoading = false
        }
    }

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        if (isLoading) {
            CircularProgressIndicator()
        } else {
            if (isOnboardingSuccess) {
                Text("Onboarding Components Demo Completed. Validation Token: $validationToken")
            } else {
                Text("Could not complete onboarding. $failureMessage")
            }
        }
    }
}