import java.util.Scanner;
import java.util.Random;

public class NumberGame {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rand = new Random();
        int attemptsLimit = 5;
        int score = 0;

        while (true) {
            int number = rand.nextInt(100) + 1;
            int attempts = 0;
            boolean guessed = false;

            System.out.println("Guess a number between 1 to 100:");

            while (attempts < attemptsLimit) {
                int guess = sc.nextInt();
                attempts++;

                if (guess == number) {
                    System.out.println("Correct! You guessed it in " + attempts + " attempts.");
                    score++;
                    guessed = true;
                    break;
                } else if (guess < number) {
                    System.out.println("Too low!");
                } else {
                    System.out.println("Too high!");
                }
            }

            if (!guessed) {
                System.out.println("Sorry! The number was: " + number);
            }

            System.out.println("Play again? (yes/no)");
            if (!sc.next().equalsIgnoreCase("yes")) {
                break;
            }
        }

        System.out.println("Your final score is: " + score);
        sc.close();
    }
}
