import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Scanner;
    public class Main {
    public static void main(String[] args) throws ParseException {
        System.out.println("HELLo World!");
        Scanner in = new Scanner(System.in);
        System.out.print("Please, enter your name:");
        String Imya = in.nextLine();
        System.out.println("Hello " + Imya + "!");
        int length = Imya.length();
        System.out.println("Your name has " + length + " letters. " + length + "! = " + fact(length));
        System.out.print("Please, enter your birth date in format (DD.MM.YYYY):");
        SimpleDateFormat f = new SimpleDateFormat("dd.MM.yyyy");
        String birth = in.nextLine();
        Date date = f.parse(birth);
        Date currDate = new Date();
        int year = yearOf(currDate) - yearOf(date);
        long days = (currDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24;
        System.out.println("Today is " + f.format(new Date()) + ", you are " + year + " year (" + days + " days) old.");
    }
    static int yearOf(Date date){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.YEAR);
    }
 
    static int fact(int num) {
        int result = 1;
        for (int i = 1; i <= num; i++) {
            result *= i;
        }
        return result;
    }
}
