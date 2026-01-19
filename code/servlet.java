public class MyDownloadServlet extends HttpServlet {

	private File file = null;

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String path = req.getParameter("path");
		file = new File(path);
		FileinputStream fis = new FileinputStream(file);

		int c = -1;
		while((c = fis.read()) != -1) {
			resp.getOutputStream().write(c);
		}
	}
}