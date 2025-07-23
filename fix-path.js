import through from "through2";
import PluginError from "plugin-error";
import { load } from "cheerio"; // Use named import for cheerio's `load` function

// Define the plugin function
export default function fixPath() {
  return through.obj(function (file, encoding, callback) {
    // Check if the file is null
    if (file.isNull()) {
      return callback(null, file);
    }

    // Check if the file is a stream (not supported in this example)
    if (file.isStream()) {
      this.emit(
        "error",
        new PluginError("fix-path-plugin", "Streams are not supported")
      );
      return callback();
    }

    // Process the file if it's a buffer (HTML file)
    if (file.isBuffer()) {
      try {
        // Get the file contents as a string
        let contents = file.contents.toString(encoding);

        // Load the HTML into cheerio for manipulation
        const $ = load(contents); // Use the `load` function directly

        // Find all <img> tags and update their src attributes
        $("img").each(function () {
          let src = $(this).attr("src");
          if (src && src.startsWith("../../assets")) {
            // Replace '../../assets' with 'assets'
            src = src.replace("../../assets", "assets");
            $(this).attr("src", src);
          }
        });

        // Update the file contents with the modified HTML
        file.contents = Buffer.from($.html());
      } catch (err) {
        this.emit("error", new PluginError("fix-path-plugin", err));
      }
    }

    // Pass the file along the pipeline
    callback(null, file);
  });
}
