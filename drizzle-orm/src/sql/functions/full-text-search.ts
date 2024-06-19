import type { AnyPgColumn } from '~/pg-core/index.ts';
import { type SQL, sql } from '../sql.ts';

type Configuration =
	| 'simple'
	| 'arabic'
	| 'armenian'
	| 'basque'
	| 'catalan'
	| 'danish'
	| 'dutch'
	| 'english'
	| 'finnish'
	| 'french'
	| 'german'
	| 'greek'
	| 'hindi'
	| 'hungarian'
	| 'indonesian'
	| 'irish'
	| 'italian'
	| 'lithuanian'
	| 'nepali'
	| 'norwegian'
	| 'portuguese'
	| 'romanian'
	| 'russian'
	| 'serbian'
	| 'spanish'
	| 'swedish'
	| 'tamil'
	| 'turkish'
	| 'yiddish';

type Weight = 'A' | 'B' | 'C' | 'D';

/**
 * Converts a document to the `tsvector` data type.
 *
 * @param {AnyPgColumn | string} document - The document to be converted into `tsvector`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select({ value: to_tsvector(posts.title) }).from(posts);
 * ```
 */
export function to_tsvector(document: AnyPgColumn | string): SQL;
/**
 * Converts a document to the `tsvector` data type.
 *
 * @param {Configuration | string} configuration - Text search configuration (e.g., 'english', 'simple').
 * @param {AnyPgColumn | string} document - The document to be converted into `tsvector`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select({ value: to_tsvector('english', posts.title) }).from(posts);
 * ```
 */
export function to_tsvector(configuration: Configuration | string, document: AnyPgColumn | string): SQL;
export function to_tsvector(arg1: Configuration | AnyPgColumn | string, arg2?: AnyPgColumn | string): SQL {
	return arg2 ? sql`to_tsvector(${arg1}, ${arg2})` : sql`to_tsvector(${arg1})`;
}

/**
 * Converts a query to the `tsquery` data type.
 *
 * @param {string} query - The text to be converted into `tsquery`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select().from(posts).where(sql`${to_tsvector(posts.title)} @@ ${to_tsquery('Drizzle')}`);
 * ```
 */
export function to_tsquery(query: string): SQL;
/**
 * Converts a query to the `tsquery` data type.
 *
 * @param {Configuration | string} configuration - Text search configuration (e.g., 'english', 'simple').
 * @param {string} query - The text to be converted into `tsquery`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select().from(posts).where(sql`${to_tsvector('english', posts.title)} @@ ${to_tsquery('english', 'Drizzle')}`);
 * ```
 */
export function to_tsquery(configuration: Configuration | string, query: string): SQL;
export function to_tsquery(arg1: Configuration | string, arg2?: string): SQL {
	return arg2 ? sql`to_tsquery(${arg1}, ${arg2})` : sql`to_tsquery(${arg1})`;
}

/**
 * Converts a query to the `tsquery` data type.
 *
 * The text is parsed and normalized much as for `to_tsvector`, then the `&` (AND) tsquery operator is inserted between surviving words.
 *
 * @param {string} query - The text to be converted into `tsquery`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select().from(posts).where(sql`${to_tsvector(posts.title)} @@ ${plainto_tsquery('PostgreSQL MySQL SQLite')}`);
 * ```
 */
export function plainto_tsquery(query: string): SQL;
/**
 * Converts a query to the `tsquery` data type.
 *
 * The text is parsed and normalized much as for `to_tsvector`, then the `&` (AND) tsquery operator is inserted between surviving words.
 *
 * @param {Configuration | string} configuration - Text search configuration (e.g., 'english', 'simple').
 * @param {string} query - The text to be converted into `tsquery`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select().from(posts).where(sql`${to_tsvector('english', posts.title)} @@ ${plainto_tsquery('english', 'PostgreSQL MySQL SQLite')}`);
 * ```
 */
export function plainto_tsquery(configuration: Configuration | string, query: string): SQL;
export function plainto_tsquery(arg1: Configuration | string, arg2?: string): SQL {
	return arg2 ? sql`plainto_tsquery(${arg1}, ${arg2})` : sql`plainto_tsquery(${arg1})`;
}

/**
 * Converts a query to the `tsquery` data type.
 *
 * `phraseto_tsquery` behaves much like `plainto_tsquery`, except that it inserts the `<->` (FOLLOWED BY) operator between surviving words instead of the `&` (AND) operator.
 *
 * @param {string} query - The text to be converted into `tsquery`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select().from(posts).where(sql`${to_tsvector(posts.title)} @@ ${phraseto_tsquery('Drizzle best practice')}`);
 * ```
 */
export function phraseto_tsquery(query: string): SQL;
/**
 * Converts a query to the `tsquery` data type.
 *
 * `phraseto_tsquery` behaves much like `plainto_tsquery`, except that it inserts the `<->` (FOLLOWED BY) operator between surviving words instead of the `&` (AND) operator.
 *
 * @param {Configuration | string} configuration - Text search configuration (e.g., 'english', 'simple').
 * @param {string} query - The text to be converted into `tsquery`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select().from(posts).where(sql`${to_tsvector('english', posts.title)} @@ ${phraseto_tsquery('english', 'Drizzle best practice')}`);
 * ```
 */
export function phraseto_tsquery(configuration: Configuration | string, query: string): SQL;
export function phraseto_tsquery(arg1: Configuration | string, arg2?: string): SQL {
	return arg2 ? sql`phraseto_tsquery(${arg1}, ${arg2})` : sql`phraseto_tsquery(${arg1})`;
}

/**
 * Converts a query to the `tsquery` data type.
 *
 * `websearch_to_tsquery` creates a `tsquery` value from querytext using an alternative syntax in which simple unformatted text is a valid query. Unlike `plainto_tsquery` and `phraseto_tsquery`, it also recognizes certain operators. Moreover, this function will never raise syntax errors, which makes it possible to use raw user-supplied input for search.
 *
 * @param {string} query - The text to be converted into `tsquery`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select().from(posts).where(sql`${to_tsvector(posts.title)} @@ ${websearch_to_tsquery('tips or updates Drizzle')}`);
 * ```
 */
export function websearch_to_tsquery(query: string): SQL;
/**
 * Converts a query to the `tsquery` data type.
 *
 * `websearch_to_tsquery` creates a `tsquery` value from querytext using an alternative syntax in which simple unformatted text is a valid query. Unlike `plainto_tsquery` and `phraseto_tsquery`, it also recognizes certain operators. Moreover, this function will never raise syntax errors, which makes it possible to use raw user-supplied input for search.
 *
 * @param {Configuration | string} configuration - Text search configuration (e.g., 'english', 'simple').
 * @param {string} query - The text to be converted into `tsquery`.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * await db.select().from(posts).where(sql`${to_tsvector('english', posts.title)} @@ ${websearch_to_tsquery('english', 'tips or updates Drizzle')}`);
 * ```
 */
export function websearch_to_tsquery(configuration: Configuration | string, query: string): SQL;
export function websearch_to_tsquery(arg1: Configuration | string, arg2?: string): SQL {
	return arg2 ? sql`websearch_to_tsquery(${arg1}, ${arg2})` : sql`websearch_to_tsquery(${arg1})`;
}

/**
 * Calculates the text search rank of a document represented by a `tsvector` against a `tsquery`.
 *
 * @param {SQL} vector - The `tsvector` representation of the document.
 * @param {SQL} query - The `tsquery` to compare against the vector.
 * @param {number} [normalization] - Optional normalization parameter. Specifies whether and how a document's length should impact its rank.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * const vector = to_tsvector('english', posts.title);
 * const query = to_tsquery('english', 'Drizzle');
 * const rank = ts_rank(vector, query);
 *
 * await db.select({ post: posts, rank }).from(posts).where(gt(rank, 0));
 * ```
 */
export function ts_rank(vector: SQL, query: SQL, normalization?: number): SQL;
/**
 * Calculates the text search rank of a document represented by a `tsvector` against a `tsquery`, using weights.
 *
 * @param {number[]} weights - Array of weights applied to the document's components.
 * @param {SQL} vector - The `tsvector` representation of the document.
 * @param {SQL} query - The `tsquery` to compare against the vector.
 * @param {number} [normalization] - Optional normalization parameter. Specifies whether and how a document's length should impact its rank.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * const weights = [0.1, 0.2, 0.4, 0.3];
 * const vector = to_tsvector('english', posts.title);
 * const query = to_tsquery('english', 'Drizzle');
 * const rank = ts_rank(weights, vector, query);
 *
 * await db.select({ post: posts, rank }).from(posts).where(gt(rank, 0));
 * ```
 */
export function ts_rank(weights: number[], vector: SQL, query: SQL, normalization?: number): SQL;
export function ts_rank(arg1: number[] | SQL, arg2: SQL | number, arg3?: SQL | number, arg4?: number): SQL {
	if (Array.isArray(arg1) && typeof arg2 !== 'number' && arg3 !== undefined) {
		return arg4
			? sql`ts_rank(string_to_array(${arg1.join(',')}, ',')::float4[], ${arg2}, ${arg3}, ${arg4})`
			: sql`ts_rank(string_to_array(${arg1.join(',')}, ',')::float4[], ${arg2}, ${arg3})`;
	} else {
		return arg3 ? sql`ts_rank(${arg1}, ${arg2}, ${arg3})` : sql`ts_rank(${arg1}, ${arg2})`;
	}
}

/**
 * Calculates the text search rank of a document with cover density ranking, represented by a `tsvector` against a `tsquery`.
 *
 * @param {SQL} vector - The `tsvector` representation of the document.
 * @param {SQL} query - The `tsquery` to compare against the vector.
 * @param {number} [normalization] - Optional normalization parameter. Specifies whether and how a document's length should impact its rank.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * const vector = to_tsvector('english', posts.title);
 * const query = to_tsquery('english', 'Drizzle');
 * const rankCd = ts_rank_cd(vector, query);
 *
 * await db.select({ post: posts, rankCd }).from(posts).where(gt(rankCd, 0));
 * ```
 */
export function ts_rank_cd(vector: SQL, query: SQL, normalization?: number): SQL;
/**
 * Calculates the text search rank of a document represented by a `tsvector` against a `tsquery`, using weights.
 *
 * @param {number[]} weights - Array of weights applied to the document's components.
 * @param {SQL} vector - The `tsvector` representation of the document.
 * @param {SQL} query - The `tsquery` to compare against the vector.
 * @param {number} [normalization] - Optional normalization parameter. Specifies whether and how a document's length should impact its rank.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * const weights = [0.1, 0.2, 0.4, 0.3];
 * const vector = to_tsvector('english', posts.title);
 * const query = to_tsquery('english', 'Drizzle');
 * const rankCd = ts_rank_cd(weights, vector, query);
 *
 * await db.select({ post: posts, rankCd }).from(posts).where(gt(rankCd, 0));
 * ```
 */
export function ts_rank_cd(weights: number[], vector: SQL, query: SQL, normalization?: number): SQL;
export function ts_rank_cd(arg1: number[] | SQL, arg2: SQL | number, arg3?: SQL | number, arg4?: number): SQL {
	if (Array.isArray(arg1) && typeof arg2 !== 'number' && arg3 !== undefined) {
		return arg4
			? sql`ts_rank_cd(string_to_array(${arg1.join(',')}, ',')::float4[], ${arg2}, ${arg3}, ${arg4})`
			: sql`ts_rank_cd(string_to_array(${arg1.join(',')}, ',')::float4[], ${arg2}, ${arg3})`;
	} else {
		return arg3 ? sql`ts_rank_cd(${arg1}, ${arg2}, ${arg3})` : sql`ts_rank_cd(${arg1}, ${arg2})`;
	}
}

/**
 * Used to label the entries of a `tsvector` with a given weight, where a weight is one of the letters A, B, C, or D.
 *
 * @param {SQL} vector - The `tsvector` representation of the document.
 * @param {Weight} weight - The weight to be assigned to the elements of the vector.
 * @returns {SQL}
 *
 * @example
 * ```ts
 * const weightedVectorTitle = setweight(to_tsvector('english', posts.title), 'A');
 * const weightedVectorDescription = setweight(to_tsvector('english', posts.description), 'B');
 * const query = to_tsquery('english', 'Drizzle');
 *
 * await db.select().from(posts).where(sql`(${weightedVectorTitle} || ${weightedVectorDescription}) @@ ${query}`);
 * ```
 */
export function setweight(vector: SQL, weight: Weight): SQL {
	return sql`setweight(${vector}, ${weight})`;
}
