"use client";

import { Login } from "@/components/auth/login";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

// Placeholder creator data with curated human photos
const creators = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format",
    alt: "Professional male creator",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format",
    alt: "Creative female artist",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format",
    alt: "Young male creator",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format",
    alt: "Fashion model creator",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=800&auto=format",
    alt: "Business professional",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format",
    alt: "Portrait photographer",
  },
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { data: user, loading: userLoading } = useAuthenticatedUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Once client-side rendering is available, check if the user is authenticated
  useEffect(() => {
    if (isClient && !userLoading && user) {
      redirect("/feed");
    }
  }, [isClient, user, userLoading]);

  // Show loading state while checking authentication
  if (userLoading || !isClient) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />

      <main className="flex-1 pt-10">
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-between p-4">
          {/* Hero section - Top to bottom layout with reduced spacing */}
          <div className="flex flex-col items-center py-10 pt-16 text-center">
            {/* Badge */}
            <Badge className="mb-4 w-fit bg-[#00A8FF] font-medium text-sm text-white hover:bg-[#00A8FF]/90">
              Welcome to Believr!
            </Badge>

            {/* Headline - with tighter tracking */}
            <h1 className="max-w-3xl font-bold text-4xl tracking-tighter md:text-5xl lg:text-6xl">
              Where early believers
              <span className="text-[#00A8FF]"> co-invest</span> in creators success
            </h1>

            {/* Subheadline - smaller with reduced margin */}
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              Believr is a decentralized social co-investing platform where early believers back
              creators they believe in and share in their success.{" "}
              <span className="font-bold">Built on Lens Protocol.</span>
            </p>

            {/* CTA Button */}
            <div className="mt-8 w-full max-w-xs">
              <Login label="Get Started" />
            </div>
          </div>

          {/* Creator showcase - Two rows of scrolling images with fade effects */}
          <div className="mt-0 mb-0 w-full">
            <div className="relative mx-auto flex h-[140px] w-full max-w-3xl flex-col gap-2 overflow-hidden">
              {/* Top row - right to left */}
              <div className="relative h-[65px] w-full overflow-hidden">
                <div className="absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />
                <div className="absolute top-0 left-0 w-full" style={{ display: "flex" }}>
                  <motion.div
                    className="flex w-full gap-3"
                    animate={{ x: [0, "-50%"] }}
                    transition={{
                      x: {
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: 40,
                        ease: "linear",
                      },
                    }}
                    style={{ display: "flex", whiteSpace: "nowrap" }}
                  >
                    {creators.map((creator, index) => (
                      <div
                        key={`creator-top-first-${creator.id}-${index}`}
                        className="group relative h-[60px] min-w-[60px] flex-shrink-0 overflow-hidden rounded-full shadow-lg transition-all duration-300 hover:z-10 hover:scale-110"
                      >
                        <Image
                          src={creator.image}
                          alt={creator.alt}
                          fill
                          sizes="60px"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    ))}
                    {creators.map((creator, index) => (
                      <div
                        key={`creator-top-second-${creator.id}-${index}`}
                        className="group relative h-[60px] min-w-[60px] flex-shrink-0 overflow-hidden rounded-full shadow-lg transition-all duration-300 hover:z-10 hover:scale-110"
                      >
                        <Image
                          src={creator.image}
                          alt={creator.alt}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
              {/* Bottom row - left to right */}
              <div className="relative h-[65px] w-full overflow-hidden">
                <div className="absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />
                <div className="absolute top-0 left-0 w-full" style={{ display: "flex" }}>
                  <motion.div
                    className="flex w-full gap-3"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                      x: {
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: 50,
                        ease: "linear",
                      },
                    }}
                    style={{ display: "flex", whiteSpace: "nowrap" }}
                  >
                    {creators.map((creator, index) => (
                      <div
                        key={`creator-bottom-first-${creator.id}-${index}`}
                        className="group relative h-[60px] min-w-[60px] flex-shrink-0 overflow-hidden rounded-full shadow-lg transition-all duration-300 hover:z-10 hover:scale-110"
                      >
                        <Image
                          src={creator.image}
                          alt={creator.alt}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                    {creators.map((creator, index) => (
                      <div
                        key={`creator-bottom-second-${creator.id}-${index}`}
                        className="group relative h-[60px] min-w-[60px] flex-shrink-0 overflow-hidden rounded-full shadow-lg transition-all duration-300 hover:z-10 hover:scale-110"
                      >
                        <Image
                          src={creator.image}
                          alt={creator.alt}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
