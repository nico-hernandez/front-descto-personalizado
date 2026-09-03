<script runat="server">
  Platform.Load("Core", "1.1.1");

  var url = "https://api.github.com/repos/nico-hernandez/front-descto-personalizado/contents/descuento-personalizado-v2.html";

  var req = new Script.Util.HttpRequest(url);
  req.method = "GET";
  req.retries = 2;
  req.continueOnError = false;

  //  Header obligatorio
  req.setHeader("User-Agent", "SFMC-SSJS");

  var resp = req.send();
  var statusCode = resp.statusCode;
  var content = String(resp.content);

  if (statusCode == 200 || statusCode == 304) {
    var json = Platform.Function.ParseJSON(content);

    //  limpiar base64
    var cleanContent = json["content"].replace(/\n/g, "");
    var html = Platform.Function.Base64Decode(cleanContent);
    var output = Platform.Function.TreatAsContent(html);
    
    Platform.Response.Write(output);
  } else {
    Platform.Response.Write("Error Status: " + statusCode);
    Platform.Response.Write("<br>Response: " + content);
  }

</script>