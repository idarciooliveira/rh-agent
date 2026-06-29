const CAREER_GOAL_KEY_PREFIX = "career-goal:";

export function saveCareerGoal(snapshotId: string, careerGoal: string) {
	if (typeof sessionStorage === "undefined") {
		return;
	}

	sessionStorage.setItem(`${CAREER_GOAL_KEY_PREFIX}${snapshotId}`, careerGoal);
}

export function getCareerGoal(snapshotId: string): string | null {
	if (typeof sessionStorage === "undefined") {
		return null;
	}

	return sessionStorage.getItem(`${CAREER_GOAL_KEY_PREFIX}${snapshotId}`);
}
