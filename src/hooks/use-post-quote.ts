"use client";

import { getLensClient } from "@/lib/lens/client";
import { SessionClient, postId } from "@lens-protocol/client";
import { post } from "@lens-protocol/client/actions";
import { textOnly } from "@lens-protocol/metadata";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * A hook for handling post quotes with Lens Protocol
 *
 * @param postIdValue The ID of the post to quote
 * @param onSuccess Optional callback for when quote succeeds
 * @returns An object with the quoting state and function
 */
export function usePostQuote(postIdValue: string, onSuccess?: () => void) {
  const { data: user } = useAuthenticatedUser();
  const [isLoading, setIsLoading] = useState(false);

  const createQuote = async (content: string) => {
    if (!user) {
      toast.error("You need to be logged in to quote posts");
      return;
    }

    if (!content.trim()) {
      toast.error("Quote content cannot be empty");
      return;
    }

    setIsLoading(true);

    try {
      // Get the Lens client (async function)
      const client = await getLensClient();

      // If we don't have a session client, we can't perform authenticated operations
      if (!("storage" in client)) {
        toast.error("Authentication required");
        setIsLoading(false);
        return;
      }

      // Now we know this is a SessionClient
      const sessionClient = client as SessionClient;
      const targetPostId = postId(postIdValue);

      // First we should check if we can quote this post by checking post.operations.canQuote
      // But for simplicity, we'll proceed directly to the quote action

      // Create proper metadata for the quote
      const metadata = textOnly({
        content: content,
      });

      // Create the post with quoteOf
      const result = await post(sessionClient, {
        contentUri: await metadata.toString(),
        quoteOf: {
          post: targetPostId,
        },
      });

      if (result.isErr()) {
        toast.error("Failed to quote post");
        console.error(result.error);
        setIsLoading(false);
        return;
      }

      toast.success("Post quoted successfully");
      onSuccess?.();
    } catch (error) {
      console.error("Error quoting post:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createQuote,
  };
}
