import java.io.*;
import java.lang.StringBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
// import java.io.IOException;
import javax.imageio.ImageIO;
import java.util.Base64;

// This java class compiles a single in-line HTML page from the source files
// and adds the csv data as a javascript json dictionary.
public class PackageHTML {
    // Start with base HTML file
    // Load in .css
    // Convert data from pdf to json
    // Load in the data
    // Load in the javascript

    public static void main(String[] args) {
        generateIndex();
    }

    private static void generateIndex() {
        try {
            BufferedReader htmlBase = getHTMLReader("index_base.html");
            PrintWriter outFile = getOutStream("index.html");
            String line;

            while((line = htmlBase.readLine()) != null) {
                if (line.equals("{{CSS}}"))
                    outFile.println(readUTF8File("styles.css"));
                else if (line.equals("{{DATA}}"))
                    outFile.println(formatJSON(loadCSV("fakedata.csv")));
                else if (line.equals("{{JAVASCRIPT}}"))
                    outFile.println(readUTF8File("script_map.js"));
                else
                    outFile.println(line);
            }

            htmlBase.close();
            outFile.close();
            System.out.println("Writing index.html Complete!");
        }
        catch(Exception e) {
            System.err.println("Generating index.html Failed!");
            System.err.println("");
            System.err.println("Error : " + e.getMessage());
        }
    }

    private static BufferedReader getHTMLReader(String path) throws Exception {
        try {
            FileReader fr = new FileReader(Paths.get(path).toString());
            return new BufferedReader(fr);
        }
        catch (Exception e) {
            System.err.println("Opening HTML file failed.");
            throw e;
        }
    }

    private static PrintWriter getOutStream(String path) throws Exception {
        try {
            FileWriter fw = new FileWriter(Paths.get(path).toString());
            return new PrintWriter(fw);
        }
        catch (Exception e) {
            System.err.println("Creating output file failed.");
            throw e;
        }
    }

    private static String readUTF8File(String path) throws IOException 
    {
      byte[] encoded = Files.readAllBytes(Paths.get(path));
      return new String(encoded, StandardCharsets.UTF_8);
    }

    private static List<List<String>> loadCSV(String path) throws Exception {
        List<List<String>> records = new ArrayList<>();
        try {
            FileReader fr = new FileReader(Paths.get(path).toString());
            BufferedReader br = new BufferedReader(fr);
            String line;

            while ((line = br.readLine()) != null) {
                String[] values = line.split(
                    ",(?=([^\"]*\"[^\"]*\")*[^\"]*$)");
                records.add(Arrays.asList(values));
            }
            br.close();
            fr.close();
            return records;
        }
        catch(Exception e) {
            System.err.println("CSV file not readable.");
            throw e;
        }
    }

    private static String formatJSON(List<List<String>> data) throws Exception {
        int numRows = data.size();
        List<String> colNames = data.get(0);
        StringBuffer jsonString = new StringBuffer(
            "const DATA = {type:\"FeatureCollection\",features:[");

        for (int i = 1; i < numRows; i++) {
            appendFeature(jsonString, colNames, data.get(i));
            if (i < numRows-1) jsonString.append(",");
        }

        jsonString.append("]};");
        return jsonString.toString();
    }

    // Columns start with Latitude, Longitude, the rest are all properties
    private static void appendFeature(StringBuffer buf, List<String> colNames,
                                     List<String> row) throws Exception {
        int numProps = row.size();
        buf.append(
            "{type:\"Feature\",geometry:{type:\"Point\",coordinates:[" +
            row.get(1) + "," + row.get(0) + "]},properties:{");

        buf.append(
            "\"" + colNames.get(2) + "\":\"" + getImage(row.get(2)) + "\"");
        if (numProps > 3) buf.append(",");

        for (int i = 3; i < numProps; i++) {
            buf.append("\"" + colNames.get(i) + "\":\"" + row.get(i) + "\"");
            if (i < numProps-1) buf.append(",");
        }

        buf.append("}}");
    }

    private static String getImage(String filename) throws Exception {
        if (filename.length() == 0) {
            return "";
        }

        ByteArrayOutputStream baos=new ByteArrayOutputStream(1000);

        try {
            BufferedImage img=ImageIO.read(new File(filename));
            ImageIO.write(img, "png", baos);
            baos.flush();

            String base64String = 
                Base64.getEncoder().encodeToString(baos.toByteArray());
            baos.close();

            return base64String;
        }
        catch (Exception e) {
            System.err.println("Problem loading image file: " + filename);
            throw e;
        }
    }
}