import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ClientOnly } from "#/components/ClientOnly";
import { ensureSession } from "#/server/session";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	loader: () => ensureSession(),
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Redline: free LinkedIn profile review for your next job",
			},
			{
				name: "description",
				content:
					"Enter your LinkedIn username and the role you want. Get a score, a goal-specific SWOT and rewritten headline, About and bullets in about 30 seconds. Free, no signup.",
			},
			{
				name: "theme-color",
				content: "#faf7f2",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,500..700&family=Geist+Mono:wght@500&family=Geist:wght@400..700&display=swap",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body
				className="min-h-screen bg-background text-ink antialiased"
				suppressHydrationWarning
			>
				{children}
				<ClientOnly>
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</ClientOnly>
				<Scripts />
			</body>
		</html>
	);
}
