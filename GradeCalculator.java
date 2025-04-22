import java.util.Scanner;

public class GradeCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("📚 Enter number of subjects: ");
        int numSubjects = sc.nextInt();
        int[] marks = new int[numSubjects];
        int total = 0;

        // Taking input marks
        for (int i = 0; i < numSubjects; i++) {
            System.out.print("Enter marks for subject " + (i + 1) + ": ");
            marks[i] = sc.nextInt();

            // Validating marks
            while (marks[i] < 0 || marks[i] > 100) {
                System.out.print("Invalid input! Enter marks between 0 to 100: ");
                marks[i] = sc.nextInt();
            }

            total += marks[i];
        }

        double percentage = (double) total / numSubjects;
        String grade;

        // Assign grade based on percentage
        if (percentage >= 90) {
            grade = "A+";
        } else if (percentage >= 80) {
            grade = "A";
        } else if (percentage >= 70) {
            grade = "B";
        } else if (percentage >= 60) {
            grade = "C";
        } else if (percentage >= 50) {
            grade = "D";
        } else {
            grade = "F";
        }

        // Display results
        System.out.println("\n----- RESULT -----");
        System.out.println("Total Marks: " + total);
        System.out.printf("Percentage: %.2f%%\n", percentage);
        System.out.println("Grade: " + grade);

        sc.close();
    }
}
