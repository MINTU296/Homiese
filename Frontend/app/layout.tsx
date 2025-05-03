import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local";

const Poppins = localFont({
    src : [
        {

            path : "./fonts/Poppins-Black.ttf",
            weight : '900',
            style : "normal",
        },
        {
            path : "./fonts/Poppins-ExtraBold.ttf",
            weight : '800',
            style : "normal",
        },{
            path : "./fonts/Poppins-Bold.ttf",
            weight : '700',
            style : "normal",
        },{
            path : "./fonts/Poppins-SemiBold.ttf",
            weight : '600',
            style : "normal",
        },{
            path : "./fonts/Poppins-Medium.ttf",
            weight : '500',
            style : "normal",
        },{
            path : "./fonts/Poppins-Regular.ttf",
            weight : '400',
            style : "normal",
        },{
            path : "./fonts/Poppins-Thin.ttf",
            weight : '300',
            style : "normal",
        },{
            path : "./fonts/Poppins-Light.ttf",
            weight : '200',
            style : "normal",
        },
        {
            path : "./fonts/Poppins-ExtraLight.ttf",
            weight : '100',
            style : "normal",
        }
    ],
    variable : "--font-poppins",
})

export const metadata: Metadata = {
  title: "Homiese",
  description: "New era of selecting college",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
            className={`${Poppins.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
