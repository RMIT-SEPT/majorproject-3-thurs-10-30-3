package edu.rmit.common.utils;

import java.util.Random;

public class UsernameGeneratorUtil {

    public static String generateUsername(String prefix){
        return prefix + generateRandomNumbers();
    }

    public static int generateRandomNumbers(){
        Random rand = new Random();
        return rand.nextInt(9000000) + 1000000;
    }
}
