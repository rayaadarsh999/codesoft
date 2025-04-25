import java.util.Scanner;

public class CurrencyConverter {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Supported currencies
        String[] currencies = {"INR", "USD", "EUR", "GBP", "JPY"};

        // Static conversion rates from 1 unit of base to target currency
        double[][] conversionRates = {
            // INR    USD     EUR     GBP     JPY
            {1,     0.012,  0.011,  0.0095,  1.63},     // INR
            {83.3,  1,      0.92,   0.79,    136.65},   // USD
            {90.1,  1.09,   1,      0.86,    148.7},    // EUR
            {105.2, 1.27,   1.16,   1,       172.3},    // GBP
            {0.61,  0.0073, 0.0067, 0.0058,  1}         // JPY
        };

        // Display available currencies
        System.out.println("Available Currencies:");
        for (int i = 0; i < currencies.length; i++) {
            System.out.println((i + 1) + ". " + currencies[i]);
        }

        // Select base currency
        System.out.print("Enter the number for base currency: ");
        int baseIndex = sc.nextInt() - 1;

        // Select target currency
        System.out.print("Enter the number for target currency: ");
        int targetIndex = sc.nextInt() - 1;

        // Enter amount
        System.out.print("Enter the amount to convert: ");
        double amount = sc.nextDouble();

        // Perform conversion
        double convertedAmount = amount * conversionRates[baseIndex][targetIndex];

        // Display result
        System.out.printf("Converted Amount from %s to %s: %.2f\n",
                currencies[baseIndex], currencies[targetIndex], convertedAmount);

        sc.close();
    }
}
