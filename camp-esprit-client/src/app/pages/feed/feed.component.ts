import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../../services/thread/thread.service';
import { ForumThread } from '../../models/Thread';
import { StatisticsService } from "../../services/statistics/statistics.service";
import { KeycloakOperationService } from "../../services/keycloak/keycloak.service";

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
    threads: ForumThread[] = [];
    showPostThread: boolean = false;
    likedThreads: number[] = []; // Array to store liked thread IDs
    userId!: string;
    recommendedThreadIds: number[] = []; // Array to store recommended thread IDs

    constructor(
        private kcSvc: KeycloakOperationService,
        private threadService: ThreadService,
        private statisticsService: StatisticsService
    ) { }

    ngOnInit(): void {
        this.loadUserId();
        console.log('FeedComponent initialized.');
        this.loadThreadsAndRecommendations(); // Load threads and recommendations on component initialization
    }

    loadThreadsAndRecommendations(): void {
        console.log('Loading threads and recommendations...');
        this.loadThreads().then(() => {
            this.loadLikedThreads().then(() => {
                this.getRecommendations();
            });
        });
    }

    loadThreads(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.threadService.getThreads().subscribe(
                threads => {
                    this.threads = threads;
                    console.log('Threads loaded:', threads);
                    resolve();
                },
                error => {
                    console.error('Error loading threads:', error);
                    reject(error);
                }
            );
        });
    }

    loadLikedThreads(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.threadService.getLikedThreadsByUserId(this.userId).subscribe(
                likedThreads => {
                    this.likedThreads = likedThreads;
                    console.log('Liked threads loaded:', likedThreads);
                    resolve();
                },
                error => {
                    console.error('Error loading liked threads:', error);
                    reject(error);
                }
            );
        });
    }

    togglePostThreadVisibility(): void {
        this.showPostThread = !this.showPostThread;
        console.log('Post thread visibility toggled:', this.showPostThread);
    }

    onThreadAdded(): void {
        console.log('New thread added. Refreshing threads...');
        this.loadThreadsAndRecommendations();
    }

    getRecommendations(): void {
        interface ThreadTag {
            id: number;
            content: string;
            tags: {
                name: string;
            }[];
        }

        interface ReqData {
            userId: string;
            threads: ThreadTag[];
            userHistory: number[];
        }

        const threadsWithTags: ThreadTag[] = this.threads.map(thread => ({
            id: thread.id,
            content: thread.content,
            tags: thread.tags.map(tag => ({ name: tag.name }))
        }));

        const requestData: ReqData = {
            userId: this.userId,
            userHistory: this.likedThreads,
            threads: threadsWithTags
        };

        console.log('Sending recommendations request:', requestData);
        this.threadService.getRecommendations(requestData).subscribe(
            recommendations => {
                console.log('Recommendations received:', recommendations);
                this.recommendedThreadIds = recommendations.recommendations; // Store recommended thread IDs
                this.orderThreadsByRecommendations(); // Order threads after recommendations are received
            },
            error => {
                console.error('Error fetching recommendations:', error);
            }
        );
    }


    orderThreadsByRecommendations(): void {
        // Create a map to quickly access the index of each thread ID in recommendedThreadIds
        const threadIdToIndexMap = new Map<number, number>();
        this.recommendedThreadIds.forEach((id, index) => {
            threadIdToIndexMap.set(id, index);
        });
    
        // Sort threads based on their index in recommendedThreadIds
        this.threads.sort((a, b) => {
            const indexA = threadIdToIndexMap.get(a.id) ?? Infinity; // Use Infinity for threads not in recommendedThreadIds
            const indexB = threadIdToIndexMap.get(b.id) ?? Infinity;
            return indexA - indexB;
        });
    
        console.log('Threads ordered by recommendations:', this.threads);
    }
    

    loadUserId(): void {
        this.userId = "ed8b6fc5-fc38-4982-92c9-364159f9c9eb"; // Replace with actual user ID retrieval logic
    }
}
