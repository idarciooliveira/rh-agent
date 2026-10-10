import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ClientOnly } from "#/components/ClientOnly";
import { LanguageProvider } from "#/lib/i18n";
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
				title:
					"Redline: pontuação grátis do seu LinkedIn para o próximo emprego",
			},
			{
				name: "description",
				content:
					"Introduza o seu nome de utilizador do LinkedIn e o cargo que quer. Receba uma pontuação, uma SWOT feita para esse objetivo e um novo título, Sobre e pontos de experiência em cerca de 30 segundos. Pontuação grátis, sem palavra-passe.",
			},
			{
				name: "theme-color",
				content: "#f4f5f7",
			},
		],
		links: [
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
				href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Literata:opsz,wght@7..72,400;7..72,600&family=JetBrains+Mono:wght@400;600&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body
				className="min-h-screen bg-background text-ink antialiased"
				suppressHydrationWarning
			>
				<LanguageProvider>{children}</LanguageProvider>
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
