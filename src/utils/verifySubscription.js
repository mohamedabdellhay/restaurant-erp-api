// Configuration
const BASE_URL = "http://localhost:3000/api";
const REGISTER_URL = `${BASE_URL}/subscription/register`;
const PLANS_URL = `${BASE_URL}/subscription/plans`;
const CONFIRM_PAYMENT_URL = `${BASE_URL}/subscription/confirm-payment`;
const ME_URL = `${BASE_URL}/auth/me`;

const runVerification = async () => {
  try {
    console.log("Starting Verification...");

    // 1. Fetch Plans
    console.log("Fetching available plans...");
    const plansRes = await fetch(PLANS_URL);
    if (!plansRes.ok)
      throw new Error(`Failed to fetch plans: ${plansRes.statusText}`);
    const plansData = await plansRes.json();
    if (!plansData.success) throw new Error("Failed to fetch plans data");

    const plans = plansData.data;
    console.log(`Found ${plans.length} plans.`);

    const basicPlan = plans.find((p) => p.name === "Basic");
    if (!basicPlan) throw new Error("Basic plan not found");
    console.log("Selected Plan:", basicPlan.name, basicPlan._id);

    // 2. Register
    const randomSuffix = Math.floor(Math.random() * 10000);
    const registerData = {
      restaurantName: `Test Resto ${randomSuffix}`,
      restaurantAddress: "123 Test St",
      restaurantPhone: "1234567890",
      adminName: "Test Admin",
      adminEmail: `admin${randomSuffix}@test.com`,
      adminPassword: "Password123!",
      planId: basicPlan._id,
    };

    console.log("Registering new restaurant...", registerData.restaurantName);
    const registerRes = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    if (registerRes.status !== 201) {
      const err = await registerRes.json();
      throw new Error(`Registration failed: ${JSON.stringify(err)}`);
    }

    const registerResData = await registerRes.json();
    const { accessToken, subscription, restaurant } = registerResData.data;
    console.log("Registration successful!");
    console.log("Restaurant ID:", restaurant._id);
    console.log("Subscription ID:", subscription._id);
    console.log("Subscription Status:", subscription.status);

    if (subscription.status !== "pending")
      throw new Error("Initial subscription status should be pending");

    // 3. Verify Admin Access
    console.log("Verifying Admin Access...");
    const meRes = await fetch(ME_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!meRes.ok) throw new Error("Failed to get profile");
    const meData = await meRes.json();
    if (!meData.success) throw new Error("Failed to get profile data");
    console.log("Admin Profile verified:", meData.data.email);

    // 4. Confirm Payment
    console.log("Confirming Payment...");
    const paymentRes = await fetch(CONFIRM_PAYMENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        subscriptionId: subscription._id,
        transactionId: "TEST_TRX_123",
      }),
    });

    if (!paymentRes.ok) {
      const err = await paymentRes.text();
      throw new Error(`Payment confirmation failed: ${err}`);
    }

    const paymentData = await paymentRes.json();
    if (!paymentData.success)
      throw new Error("Payment confirmation failed data");
    console.log("Payment Confirmed. New Status:", paymentData.data.status);

    if (paymentData.data.status !== "active")
      throw new Error("Subscription status should be active after payment");

    console.log("Verification Passed Successfully! ✅");
  } catch (error) {
    console.error("Verification Failed ❌");
    console.error(error);
    process.exit(1);
  }
};

runVerification();
