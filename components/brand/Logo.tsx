import Image from "next/image";
import logoColour from "@/public/logo.png";
import logoLight from "@/public/logo-light.png";

/**
 * THE LOGO: single point of truth for the mark.
 *
 * This is the client's supplied artwork, with its white JPEG background
 * removed and the edges un-premultiplied so it sits cleanly on any ground.
 * Two variants ship:
 *
 *   colour  navy + red, as supplied, for the paper ground
 *   light   the navy remapped to paper, red lightened, for the ink ground,
 *           where the original navy would disappear into the background
 *
 * Every appearance of the identity across the site reads from this component,
 * so replacing the artwork means replacing two files in /public and nothing
 * else. (`app/icon.png` and `public/logo-og.png` are derived from the same
 * source and would need regenerating alongside.)
 *
 * In almost every placement the image is decorative, because the registered
 * name always sits beside it as real text, which is what CICC s.44(1)(a)
 * actually requires. So `alt` defaults to empty and the element is hidden from
 * assistive technology rather than announced twice.
 */
export function Logo({
  tone = "colour",
  className = "",
  alt,
  priority = false,
  sizes,
}: {
  tone?: "colour" | "light";
  className?: string;
  /** Supply only where the logo is the sole carrier of meaning. */
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={tone === "light" ? logoLight : logoColour}
      alt={alt ?? ""}
      aria-hidden={alt ? undefined : true}
      className={className}
      priority={priority}
      sizes={sizes}
      draggable={false}
    />
  );
}
