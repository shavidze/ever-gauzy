import { Inject, Injectable } from '@nestjs/common';
import { ModuleProviders, ProbotConfig } from './probot.types';
import { App } from 'octokit';

@Injectable()
export class GitHubService {
	private readonly app: App;

	constructor(
		@Inject(ModuleProviders.ProbotConfig)
		private readonly config: ProbotConfig
	) {
		// TODO: BUG
		// ENV variable is not working here, hence getting error (" secretOrPrivateKey must be an asymmetric key when using RS256")
		this.app = new App({
			appId: this.config.appId,
			privateKey: this.config.privateKey,
		});
	}

	async openIssue(
		title: string,
		body: string,
		owner: string,
		repo: string,
		installationId: number
	) {
		const octokit = await this.app.getInstallationOctokit(installationId);

		octokit
			.request('POST /repos/{owner}/{repo}/issues', {
				owner,
				repo,
				title,
				body,

				// TODO:
				// pass dynamic values as required
				// Add all the fields that we have
				// Ex.
				// labels: ['bug', 'GauzyAPI'],

				headers: {
					'X-GitHub-Api-Version': '2022-11-28',
				},
			})
			.then((data) => {
				console.log('data', data);
			})
			.catch((error) => {
				console.log('error', error);
			});
	}
	async editIssue(
		issueNumber: number,
		title: string,
		body: string,
		repo: string,
		owner: string,
		installationId: number
	) {
		const octokit = await this.app.getInstallationOctokit(installationId);

		octokit
			.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
				owner,
				repo,
				title,
				body,

				issue_number: issueNumber,

				// TODO:
				// pass dynamic values as required
				// Add all the fields that we have
				// Ex.
				// labels: ['bug', 'GauzyAPI'],

				headers: {
					'X-GitHub-Api-Version': '2022-11-28',
				},
			})
			.then((data) => {
				console.log('data', data);
			})
			.catch((error) => {
				console.log('error', error);
			});
	}
}
