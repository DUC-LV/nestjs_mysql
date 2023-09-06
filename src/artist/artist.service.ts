import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entity/artist.entity';

@Injectable()
export class ArtistService {
    constructor(@InjectRepository(Artist) private readonly artistService: Repository<Artist>) {}

    async updateArtist(name: string, alias: string, thumbnail: string, thumbnail_m: string, total_follow: number) {
        try {
            const artist = await this.artistService.findOne({ where: { name } });
            if (artist) {
                return {
                    errorCode: 201,
                    message: 'Artist already exists!',
                    data: null,
                };
            }

            const newArtist = await this.artistService.save({ name, alias, thumbnail, thumbnail_m, total_follow });
            if (newArtist) {
                return {
                    errorCode: 200,
                    message: 'Update successfully!',
                    data: null,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAllArtist() {
        try {
            const artist = await this.artistService.createQueryBuilder().getMany();
            if (artist) {
                return {
                    errorCode: 200,
                    message: 'Success',
                    data: artist,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }
}
