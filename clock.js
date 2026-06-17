//
//  iLya Clock start script file.
//                                 ilya.da.ru  ilya000@usa.net

function clock(W,H,A) {
         document.write("<APPLET CODE=Clock.class codebase='http://www.halyava.ru/ilya' Width="+W+" Height="+H+">");
         document.write("<PARAM NAME='clock' VALUE='"+A+" starttime=("+Date()+")'>");
         document.write("</APPLET>");
}