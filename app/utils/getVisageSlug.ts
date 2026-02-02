interface PartialUser {
	id: string;
	uuid?: string;
}

// ten options for ten digits
export const defaultAccounts = [
	"X-Steve",
	"X-Alex",
	"X-Ari",
	"X-Efe",
	"X-Kai",
	"X-Makena",
	"X-Noor",
	"X-Steve",
	"X-Sunny",
	"X-Zuri",
];

/**
 * Get a user's head with a deterministic fallback
 * @author Evorp
 * @param user User object
 * @returns Usable head slug
 */
export default function getVisageSlug(user: PartialUser): string {
	if (user.uuid) return user.uuid;

	// guaranteed to have the same head for the same user always (last digit is most random)
	const seed = Number(user.id.toString().at(-1));
	return defaultAccounts[seed] || "X-Steve";
}
